module.exports = [
    {
        pattern: '/form',
        methods: ['GET'],
        action: 'form::getAction'
    },
    {
        pattern: '/items',
        methods: ['POST'],
        action: 'items::postAction'
    },
    {
        pattern: '/items',
        methods: ['DELETE'],
        action: 'items::deleteAllAction'
    },
    {
        pattern: '/items',
        methods: ['GET'],
        action: 'items::getAction'
    },
    {
        pattern: '/publics/.*',
        methods: ['GET'],
        action: 'extfile::getFile'
    },
    {
        pattern: '/public/.*',
        methods: ['GET'],
        action: 'publicfile::getFile'
    }
];
