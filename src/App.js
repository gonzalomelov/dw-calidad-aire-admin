import React from 'react';

import Icon from '@material-ui/icons/Info';
import { Admin, Login, Resource } from 'react-admin';
import { List, Datagrid, TextField, NumberField, DateField, FileField, RichTextField } from 'react-admin';
import { ShowButton, EditButton, Edit, SimpleForm, DisabledInput, TextInput, LongTextInput, DateInput, NumberInput, SelectInput, FileInput } from 'react-admin';
import { Create} from 'react-admin';
import { Show, SimpleShowLayout } from 'react-admin';
import { CardActions, CreateButton, ExportButton, RefreshButton } from 'react-admin';
import Button from '@material-ui/core/Button';

import { postgrestAuthenticator } from 'react-admin-postgrest-client';

import dataProvider from './dataProvider';
// import customRoutes from './customRoutes';
import Dashboard from './Dashboard';
// import ImportButton from './ImportButton';

import { config } from './Constants'
var url = config.url.API_URL
var pdiUrl = config.url.PDI_URL
var docsifyUrl = config.url.DOCSIFY_URL
var filestashUrl = config.url.FILESTASH_URL

const MyLoginPage = () => <Login backgroundImage="/background.png" />;

const authProvider = postgrestAuthenticator.createAuthProvider( url + '/rpc/login' );
const authRefreshSaga = postgrestAuthenticator.createAuthRefreshSaga( url + '/rpc/refresh_token', 10 ); // seconds before expiry due

export const MetodoList = (props) => (
    <List {...props}>
        <Datagrid>
            <NumberField source="idmetodo" />
            <TextField source="nommetodo" />
            <ShowButton />
            <EditButton />
        </Datagrid>
    </List>
);

export const MetodoShow = (props) => (
    <Show {...props}>
        <SimpleShowLayout>
            <NumberField source="idmetodo" />
            <TextField source="nommetodo" />
        </SimpleShowLayout>
    </Show>
);

export const MetodoEdit = (props) => (
    <Edit {...props}>
        <SimpleForm>
            <DisabledInput source="id" />
            <DisabledInput source="idmetodo" />
            <TextInput source="nommetodo" />
        </SimpleForm>
    </Edit>
);

export const MetodoCreate = (props) => (
    <Create {...props}>
        <SimpleForm>
            <NumberInput source="idmetodo" />
            <TextInput source="nommetodo" />
        </SimpleForm>
    </Create>
);

export const ContaminanteList = (props) => (
    <List {...props}>
        <Datagrid>
            <NumberField source="idcontaminante" />
            <TextField source="nomcontaminante" />
            <NumberField source="idsubtipo" />
            <TextField source="nomsubtipo" />
            <NumberField source="idtipo" />
            <TextField source="nomtipo" />
            <ShowButton />
            <EditButton />
        </Datagrid>
    </List>
);

export const ContaminanteShow = (props) => (
    <Show {...props}>
        <SimpleShowLayout>
            <NumberField source="idcontaminante" />
            <TextField source="nomcontaminante" />
            <NumberField source="idsubtipo" />
            <TextField source="nomsubtipo" />
            <NumberField source="idtipo" />
            <TextField source="nomtipo" />
        </SimpleShowLayout>
    </Show>
);

export const ContaminanteEdit = (props) => (
    <Edit {...props}>
        <SimpleForm>
            <DisabledInput source="id" />
            <DisabledInput source="idcontaminante" />
            <TextInput source="nomcontaminante" />
            <NumberInput source="idsubtipo" />
            <TextInput source="nomsubtipo" />
            <NumberInput source="idtipo" />
            <TextInput source="nomtipo" />
        </SimpleForm>
    </Edit>
);

export const ContaminanteCreate = (props) => (
    <Create {...props}>
        <SimpleForm>
            <NumberInput source="idcontaminante" />
            <TextInput source="nomcontaminante" />
            <NumberInput source="idsubtipo" />
            <TextInput source="nomsubtipo" />
            <NumberInput source="idtipo" />
            <TextInput source="nomtipo" />
        </SimpleForm>
    </Create>
);

export const EstacionDeLaRedList = (props) => (
    <List {...props}>
        <Datagrid>
            <TextField source="nomestaciondelared" />
            <TextField source="ubicestaciondelared" />
            <TextField source="descestaciondelared" />
            <TextField source="idestaciondelared" />
            <NumberField source="idbarrio" />
            <TextField source="nombarrio" />
            <NumberField source="idccz" />
            <TextField source="nomccz" />
            <ShowButton />
            <EditButton />
        </Datagrid>
    </List>
);

export const EstacionDeLaRedShow = (props) => (
    <Show {...props}>
        <SimpleShowLayout>
            <TextField source="nomestaciondelared" />
            <TextField source="ubicestaciondelared" />
            <TextField source="descestaciondelared" />
            <TextField source="idestaciondelared" />
            <NumberField source="idbarrio" />
            <TextField source="nombarrio" />
            <NumberField source="idccz" />
            <TextField source="nomccz" />
        </SimpleShowLayout>
    </Show>
);

export const EstacionDeLaRedEdit = (props) => (
    <Edit {...props}>
        <SimpleForm>
            <DisabledInput source="id" />
            <DisabledInput source="nomestaciondelared" />
            <TextField source="ubicestaciondelared" />
            <TextField source="descestaciondelared" />
            <TextField source="idestaciondelared" />
            <NumberField source="idbarrio" />
            <TextField source="nombarrio" />
            <NumberField source="idccz" />
            <TextField source="nomccz" />
        </SimpleForm>
    </Edit>
);

export const EstacionDeLaRedCreate = (props) => (
    <Create {...props}>
        <SimpleForm>
            <TextField source="nomestaciondelared" />
            <TextField source="ubicestaciondelared" />
            <TextField source="descestaciondelared" />
            <TextField source="idestaciondelared" />
            <NumberInput source="idbarrio" />
            <TextInput source="nombarrio" />
            <NumberInput source="idccz" />
            <TextInput source="nomccz" />
        </SimpleForm>
    </Create>
);

export const DiaImportanteList = (props) => (
    <List {...props}>
        <Datagrid>
            <NumberField source="iddiaimportante" />
            <TextField source="nomdiaimportante" />
            <TextField source="nomtipodiaimportante" />
            <ShowButton />
            <EditButton />
        </Datagrid>
    </List>
);

export const DiaImportanteShow = (props) => (
    <Show {...props}>
        <SimpleShowLayout>
            <NumberField source="iddiaimportante" />
            <TextField source="nomdiaimportante" />
            <NumberField source="idtipodiaimportante" />
            <TextField source="nomtipodiaimportante" />
            <NumberField source="idfecha" />
            <NumberField source="idhora" />
        </SimpleShowLayout>
    </Show>
);

export const DiaImportanteEdit = (props) => (
    <Edit {...props}>
        <SimpleForm>
            <DisabledInput source="id" />
            <DisabledInput source="iddiaimportante" />
            <TextInput source="nomdiaimportante" />
            <NumberInput source="idtipodiaimportante" />
            <TextInput source="nomtipodiaimportante" />
            <NumberInput source="idfecha" />
            <NumberInput source="idhora" />
        </SimpleForm>
    </Edit>
);

export const DiaImportanteCreate = (props) => (
    <Create {...props}>
        <SimpleForm>
            <NumberInput source="iddiaimportante" />
            <TextInput source="nomdiaimportante" />
            <NumberInput source="idtipodiaimportante" />
            <TextInput source="nomtipodiaimportante" />
            <NumberInput source="idfecha" />
            <NumberInput source="idhora" />
        </SimpleForm>
    </Create>
);

export const IndustriaList = (props) => (
    <List {...props}>
        <Datagrid>
            <NumberField source="idindustria" />
            <TextField source="nomindustria" />
            <TextField source="ubicindustria" />
            <ShowButton />
            <EditButton />
        </Datagrid>
    </List>
);

export const IndustriaShow = (props) => (
    <Show {...props}>
        <SimpleShowLayout>
            <NumberField source="idindustria" />
            <TextField source="nomindustria" />
            <TextField source="ubicindustria" />
        </SimpleShowLayout>
    </Show>
);

export const IndustriaEdit = (props) => (
    <Edit {...props}>
        <SimpleForm>
            <DisabledInput source="id" />
            <DisabledInput source="idindustria" />
            <TextInput source="nomindustria" />
            <TextInput source="ubicindustria" />
        </SimpleForm>
    </Edit>
);

export const IndustriaCreate = (props) => (
    <Create {...props}>
        <SimpleForm>
            <NumberInput source="idindustria" />
            <TextInput source="nomindustria" />
            <TextInput source="ubicindustria" />
        </SimpleForm>
    </Create>
);

export const PdiJobList = (props) => (
    <List {...props}>
        <Datagrid>
            <TextField source="id" />
            <TextField source="name" />
            <TextField source="status" />
            <DateField source="date" showTime />
            <ShowButton />
        </Datagrid>
    </List>
);

export const PdiJobShow = (props) => (
    <Show {...props}>
        <SimpleShowLayout>
            <TextField source="id" />
            <TextField source="name" />
            <TextField source="status" />
            <DateField source="date" showTime />
            <NumberField source="writtenRows" />
            <RichTextField source="log_text" />
        </SimpleShowLayout>
    </Show>
);

export const PdiJobEdit = (props) => (
    <Edit {...props}>
        <SimpleForm>
            <DisabledInput source="id" />
            <DisabledInput source="name" />
            <DisabledInput source="status" />
            <DisabledInput source="date" showTime />
        </SimpleForm>
    </Edit>
);

export const PdiJobCreate = (props) => (
    <Create {...props}>
        <SimpleForm>
            <SelectInput source="name" choices={[
                    { id: 'CargaVehiculosContaminacion', name: 'Actualizar Vehículos Contaminación' },
                    { id: 'CargaMedidaDiasImportantesContaminacion', name: 'Actualizar Días Importantes Contaminación' },
                    { id: 'CargaIndustriasContaminacion', name: 'Actualizar Industrias Contaminación' },
                    { id: 'GenerarReporteAnual', name: 'Generar Reporte Anual' }
                ]} />

            <TextInput source="conteovehicularfilename" label="Archivo conteo vehicular" placeholder="ConteoVehicular.csv" defaultValue="conteo_vehicular.csv" />
            <a href={docsifyUrl + "/#/ejemplocargadedatos"} target="_blank">Subir archivos: <Icon /></a>
            <a href={ filestashUrl + "/files/"} target="_blank">Ir a repositorio de archivos</a>
            
            <TextInput source="contaminacionfilename" label="Archivo contaminación" placeholder="Cont.csv" defaultValue="contaminacion.csv" />
            <a href={docsifyUrl + "/#/ejemplocargadedatos"} target="_blank">Subir archivos: <Icon /></a>
            <a href={ filestashUrl + "/files/"} target="_blank">Ir a repositorio de archivos</a>
            
            <TextInput source="datosmeteorologicosfilename" label="Archivo datos meteorológicos" placeholder="DatosMete.xlsx" defaultValue="datos_meteorologicos.xlsx" />
            <a href={docsifyUrl + "/#/ejemplocargadedatos"} target="_blank">Subir archivos: <Icon /></a>
            <a href={ filestashUrl + "/files/"} target="_blank">Ir a repositorio de archivos</a>
            
            <NumberInput source="year" label="year" placeholder="Año" />
            <LongTextInput source="e1" label="e1" defaultValue="Resumen del año para e1 Ciudad Vieja" />
            <LongTextInput source="e5" label="e5" defaultValue="Resumen del año para e5 Tres Cruces" />
            <LongTextInput source="e6" label="e6" defaultValue="Resumen del año para e6 Curva de Maroñas" />
            <LongTextInput source="e7" label="e7" defaultValue="Resumen del año para e7 Portones de Carrasco" />
            <LongTextInput source="e8" label="e8" defaultValue="Resumen del año para e8 Colón" />
            <TextInput source="to" label="Email de aviso" placeholder="gonzalomelov@gmail.com" />
        </SimpleForm>
    </Create>
);

//customRoutes={customRoutes} 
const App = () => (
  <Admin loginPage={MyLoginPage} dashboard={Dashboard} dataProvider={dataProvider} customSagas={[authRefreshSaga]} authProvider={authProvider} >
      <Resource name="metodos" options={{ label: 'Métodos' }} show={MetodoShow} create={MetodoCreate} edit={MetodoEdit} list={MetodoList} />
      <Resource name="contaminantes" options={{ label: 'Contaminantes' }} show={ContaminanteShow} create={ContaminanteCreate} edit={ContaminanteEdit} list={ContaminanteList} />
      <Resource name="estacionesdelared" options={{ label: 'Estaciones de la Red' }} show={EstacionDeLaRedShow} create={EstacionDeLaRedCreate} edit={EstacionDeLaRedEdit} list={EstacionDeLaRedList} />
      <Resource name="diasimportantes" options={{ label: 'Días Importantes' }} show={DiaImportanteShow} create={DiaImportanteCreate} edit={DiaImportanteEdit} list={DiaImportanteList} />
      <Resource name="industrias" options={{ label: 'Industrias' }} show={IndustriaShow} create={IndustriaCreate} edit={IndustriaEdit} list={IndustriaList} />
      <Resource name="pdijobs" options={{ label: 'Procesos' }} show={PdiJobShow} create={PdiJobCreate} edit={PdiJobEdit} list={PdiJobList} />
  </Admin>
);

export default App;