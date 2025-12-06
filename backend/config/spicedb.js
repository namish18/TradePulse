/**
 * SpiceDB Configuration
 * Authorization client using Zanzibar-style permissions
 */

import { v1 } from '@authzed/authzed-node';
import { logger } from '../middlewares/loggingMiddleware.js';

const { NewClient, CheckPermissionResponse } = v1;

// SpiceDB client configuration
const endpoint = process.env.SPICEDB_ENDPOINT || 'localhost:50051';
const token = process.env.SPICEDB_TOKEN || '';
const insecure = process.env.SPICEDB_INSECURE === 'true';

// Create SpiceDB client
let spiceDbClient = null;

try {
    if (insecure) {
        spiceDbClient = NewClient(token, endpoint, v1.ClientSecurity.INSECURE_PLAINTEXT_CREDENTIALS);
    } else {
        spiceDbClient = NewClient(token, endpoint, v1.ClientSecurity.SECURE_CHANNEL_CREDENTIALS);
    }
    logger.info('SpiceDB client initialized');
} catch (error) {
    logger.error('Failed to initialize SpiceDB client:', error);
    // Client will be null, gracefully degrade authorization
}

/**
 * Check if user has permission for a resource
 * @param {string} userId - User ID
 * @param {string} resourceType - Resource type (e.g., 'portfolio', 'order')
 * @param {string} resourceId - Resource ID
 * @param {string} permission - Permission to check (e.g., 'read', 'write', 'delete')
 * @returns {Promise<boolean>} Permission granted
 */
export async function checkPermission(userId, resourceType, resourceId, permission) {
    // If SpiceDB is not configured, allow all (development mode)
    if (!spiceDbClient) {
        logger.warn('SpiceDB client not available, allowing access');
        return true;
    }

    try {
        const request = {
            consistency: { requirement: { oneofKind: 'fullyConsistent', fullyConsistent: true } },
            resource: {
                objectType: resourceType,
                objectId: resourceId,
            },
            permission,
            subject: {
                object: {
                    objectType: 'user',
                    objectId: userId,
                },
            },
        };

        const response = await spiceDbClient.checkPermission(request);

        const permitted = response.permissionship === CheckPermissionResponse.Permissionship.HAS_PERMISSION;

        logger.debug('Permission check:', {
            userId,
            resourceType,
            resourceId,
            permission,
            permitted,
        });

        return permitted;
    } catch (error) {
        logger.error('SpiceDB permission check error:', {
            userId,
            resourceType,
            resourceId,
            permission,
            error: error.message,
        });
        // On error, deny access for safety
        return false;
    }
}

/**
 * Write relationship tuple
 * @param {string} resourceType - Resource type
 * @param {string} resourceId - Resource ID
 * @param {string} relation - Relation name (e.g., 'owner', 'viewer')
 * @param {string} subjectType - Subject type (usually 'user')
 * @param {string} subjectId - Subject ID
 * @returns {Promise<boolean>} Success status
 */
export async function writeRelationship(resourceType, resourceId, relation, subjectType, subjectId) {
    if (!spiceDbClient) {
        logger.warn('SpiceDB client not available, skipping relationship write');
        return true;
    }

    try {
        const request = {
            updates: [
                {
                    operation: v1.RelationshipUpdate_Operation.TOUCH,
                    relationship: {
                        resource: {
                            objectType: resourceType,
                            objectId: resourceId,
                        },
                        relation,
                        subject: {
                            object: {
                                objectType: subjectType,
                                objectId: subjectId,
                            },
                        },
                    },
                },
            ],
        };

        await spiceDbClient.writeRelationships(request);

        logger.debug('Relationship written:', {
            resourceType,
            resourceId,
            relation,
            subjectType,
            subjectId,
        });

        return true;
    } catch (error) {
        logger.error('SpiceDB write relationship error:', error);
        return false;
    }
}

/**
 * Delete relationship tuple
 * @param {string} resourceType - Resource type
 * @param {string} resourceId - Resource ID
 * @param {string} relation - Relation name
 * @param {string} subjectType - Subject type
 * @param {string} subjectId - Subject ID
 * @returns {Promise<boolean>} Success status
 */
export async function deleteRelationship(resourceType, resourceId, relation, subjectType, subjectId) {
    if (!spiceDbClient) {
        logger.warn('SpiceDB client not available, skipping relationship delete');
        return true;
    }

    try {
        const request = {
            updates: [
                {
                    operation: v1.RelationshipUpdate_Operation.DELETE,
                    relationship: {
                        resource: {
                            objectType: resourceType,
                            objectId: resourceId,
                        },
                        relation,
                        subject: {
                            object: {
                                objectType: subjectType,
                                objectId: subjectId,
                            },
                        },
                    },
                },
            ],
        };

        await spiceDbClient.writeRelationships(request);

        logger.debug('Relationship deleted:', {
            resourceType,
            resourceId,
            relation,
            subjectType,
            subjectId,
        });

        return true;
    } catch (error) {
        logger.error('SpiceDB delete relationship error:', error);
        return false;
    }
}

/**
 * Lookup resources a user can access
 * @param {string} userId - User ID
 * @param {string} resourceType - Resource type
 * @param {string} permission - Permission to check
 * @returns {Promise<Array<string>>} List of accessible resource IDs
 */
export async function lookupResources(userId, resourceType, permission) {
    if (!spiceDbClient) {
        logger.warn('SpiceDB client not available, returning empty list');
        return [];
    }

    try {
        const request = {
            consistency: { requirement: { oneofKind: 'fullyConsistent', fullyConsistent: true } },
            resourceObjectType: resourceType,
            permission,
            subject: {
                object: {
                    objectType: 'user',
                    objectId: userId,
                },
            },
        };

        const stream = spiceDbClient.lookupResources(request);
        const resourceIds = [];

        for await (const response of stream) {
            if (response.permissionship === CheckPermissionResponse.Permissionship.HAS_PERMISSION) {
                resourceIds.push(response.resourceObjectId);
            }
        }

        logger.debug('Resources lookup:', {
            userId,
            resourceType,
            permission,
            count: resourceIds.length,
        });

        return resourceIds;
    } catch (error) {
        logger.error('SpiceDB lookup resources error:', error);
        return [];
    }
}

/**
 * Health check for SpiceDB connection
 * @returns {Promise<boolean>} Connection status
 */
export async function healthCheck() {
    if (!spiceDbClient) {
        logger.warn('SpiceDB client not configured');
        return false;
    }

    try {
        // Try a simple permission check
        await checkPermission('health-check', 'system', 'health', 'read');
        return true;
    } catch (error) {
        logger.error('SpiceDB health check failed:', error);
        return false;
    }
}

export default {
    spiceDbClient,
    checkPermission,
    writeRelationship,
    deleteRelationship,
    lookupResources,
    healthCheck,
};
