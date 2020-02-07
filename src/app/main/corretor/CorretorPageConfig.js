import React from 'react';

export const CorretorPageConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    routes  : [
        {
            path     : '/corretores',
            component: React.lazy(() => import('./CorretorPage'))
        }
    ]
};
