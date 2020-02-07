import React from 'react';
import {Redirect} from 'react-router-dom';
import {FuseUtils} from '@fuse';
import {GrupoParticipantePageConfig} from 'app/main/grupo/GrupoParticipantePageConfig';
import { CorretorPageConfig } from 'app/main/corretor/CorretorPageConfig';

const routeConfigs = [
    GrupoParticipantePageConfig,
    CorretorPageConfig
];

const routes = [
    ...FuseUtils.generateRoutesFromConfigs(routeConfigs),
    {
        path     : '/',
        component: () => <Redirect to="/grupo"/> // default route
    }
];

export default routes;
