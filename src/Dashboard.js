import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { Title } from 'react-admin';
export default () => (
    <Card>
        <Title title="DataWarehouse Calidad de Aire - Administrador de datos" />
        <CardContent>Acá puedes cargar y editar los datos que luego cargarán la información en el DataWarehouse</CardContent>
    </Card>
);