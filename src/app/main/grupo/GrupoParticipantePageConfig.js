import React from 'react';

export const GrupoParticipantePageConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    routes  : [
        {
            path     : '/grupo',
            component: React.lazy(() => import('./GrupoParticipantePage'))
        }
    ]
};
