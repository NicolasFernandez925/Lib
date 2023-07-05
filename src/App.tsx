import { CSSProperties, useCallback, useRef, useState } from 'react';
import { Drawer } from './components/Drawer/Drawer';
import {
  Alert,
  Button,
  ContainerEmpty,
  Spinner,
  Tab,
  Tooltip,
  Table,
  Filter,
  TableData,
  sortByProperty,
  sortByOtorgadoDescending,
  Header,
  RowOnSelected,
  data,
  Switch,
} from './components';
import Icon from '@mdi/react';
import { mdiAccount } from '@mdi/js';

interface AlertHandle {
  addAlert: (message: string, description?: string) => void;
}

interface TableRef {
  resetTable: () => void | null;
}

function App() {
  /*===================== <Drawer>*/
  const [modalOpenRight, setModalOpenRight] = useState(false);
  const [modalOpenLeft, setModalOpenLeft] = useState(false);
  const handleOpenModalRight = () => {
    setModalOpenRight(true);
  };

  const handleCloseModalRight = () => {
    setModalOpenRight(false);
  };

  const handleOpenModalLeft = () => {
    setModalOpenLeft(true);
  };

  const handleCloseModalLeft = () => {
    setModalOpenLeft(false);
  };

  /*===================== <Tab> ========================*/
  const [valueTab, setValueTab] = useState<string>('Tab one');

  const handleClick = (label: string) => {
    setValueTab(label);
  };

  const style: CSSProperties = {
    fontSize: '14px',
    color: 'rgb(35, 35, 35)',
  };

  /*===================== <Switch> ========================*/
  const [isChecked, setIsChecked] = useState(false);

  const handleSwitchChange = (checked: boolean) => {
    console.log(checked);
    setIsChecked(checked);
  };

  /*===================== <Alert> ========================*/
  const refAlert = useRef<AlertHandle>({ addAlert: () => {} });
  const refAlert2 = useRef<AlertHandle>({ addAlert: () => {} });
  const refAlert3 = useRef<AlertHandle>({ addAlert: () => {} });
  const refAlert4 = useRef<AlertHandle>({ addAlert: () => {} });

  const handleAddAlert = () => {
    refAlert.current.addAlert('Alert Error.', 'Descripcion');
  };

  const handleAddAlert2 = () => {
    refAlert2.current.addAlert('Alert Info.', 'Descripcion');
  };

  const handleAddAlert3 = () => {
    refAlert3.current.addAlert('Alert Warning.', 'Descripcion');
  };

  const handleAddAlert4 = () => {
    refAlert4.current.addAlert('Alert Success.', 'Descripcion');
  };

  /*===================== <Table> ========================*/
  const [input, setInput] = useState('');
  const refTable = useRef<TableRef>(null);

  const handleOnFocusResetTable = (
    event: React.FocusEvent<HTMLInputElement>
  ) => {
    if (refTable.current && refTable.current.resetTable) {
      refTable.current.resetTable();
    }
    setInput(event.target.value);
  };

  const [selectedRows, setSelectedRows] = useState<TableData[]>([]);

  const filters: Filter<TableData>[] = [
    {
      column: 'Descripción',
      filter: sortByProperty,
    },
    {
      column: 'Otorgado',
      filter: sortByOtorgadoDescending,
    },
  ];

  const classHeaderGrid: CSSProperties = {
    display: 'grid',
    gridTemplateColumns: '1fr 3fr 1fr 1fr 1.5fr 1fr 1fr',
  };

  const classRowGrid: CSSProperties = {
    display: 'grid',
    gridTemplateColumns: '1fr 3fr 1fr 1fr 1.5fr 1fr 1fr',
  };

  const handleChange = useCallback((state: RowOnSelected<TableData>) => {
    setSelectedRows(state.selectedRows);
  }, []);

  const emptyState = {
    title: 'Aún no se han consultado Packs',
    description: 'Por favor, haga click en “Consultar”.',
  };

  const headers: Header<TableData>[] = [
    {
      value: 'Pack',
      label: 'Pack',
      tooltip: (value) => {
        return (
          <Tooltip
            position="right"
            content="Este es un tooltip"
            classNames={{
              fontSize: '12px',
            }}
          >
            <p>{value}</p>
          </Tooltip>
        );
      },
      valueGetter: (row) => {
        /*  return row.Pack === '' ? '-' : row.Pack; */
        return (
          <>
            {row.Pack === 'R10G6M-' ? (
              <Tooltip
                position="top"
                content="Este es un tooltip"
                classNames={{
                  fontSize: '12px',
                }}
              >
                <p>{row.Pack}</p>
              </Tooltip>
            ) : (
              row.Pack
            )}
          </>
        );
      },
      ariaGetter: (row) => {
        return `Valor del aria label para ejemplo,valor de la fila,${row.Pack}`;
      },
    },
    {
      value: 'Descripción',
      label: 'Descripción',
    },
    {
      value: 'Otorgado',
      label: 'Otorgado',
    },
    {
      value: 'Disponible',
      label: 'Disponible',
    },
    {
      value: 'Vencimiento',
      label: 'Vencimiento',
    },
    {
      value: 'Renov.',
      label: 'Renov.',
    },
    {
      value: 'P. Plus',
      label: 'P. Plus',
    },
    /*  {
      value: 'Action',
      label: 'Action',
      renderComponent: (params) => {
        return <p>Action</p>;
      },
    }, */

    /*  {
      value: "Selectable",
      label: "Selectable"
    } */
  ];

  return (
    <div className="App">
      {/*===================== <Table> =====================*/}
      <h4>Table</h4>
      <div>
        <input
          style={{ margin: '20px 0px' }}
          onFocus={handleOnFocusResetTable}
          type="text"
          value={input}
          placeholder="Borrar datos de la tabla"
        />
        <div className="card">
          <Table<TableData>
            emptyState={emptyState}
            bordered
            ref={refTable}
            selectableRows
            onSelectedRowsChange={handleChange}
            filters={filters}
            heigth={'400px'}
            headers={headers}
            data={data}
            showPagination={true}
            triggerData={true}
            isLoading={false}
            alternateRowColor
            classHeaderGrid={classHeaderGrid}
            classRowGrid={classRowGrid}
            footer={<Footer />}
            classCell={{ padding: '0px 8px', justifyContent: 'unset' }}
          />
        </div>
      </div>
      {/*===================== <Drawer> =====================*/}
      <h4>Drawer</h4>
      <button
        style={{
          border: 'none',
          padding: '8px',
          background: 'gray',
          color: '#fff',
          cursor: 'pointer',
          marginRight: '10px',
        }}
        onClick={handleOpenModalRight}
      >
        Open Modal Right
      </button>
      <button
        style={{
          border: 'none',
          padding: '8px',
          background: 'gray',
          color: '#fff',
          cursor: 'pointer',
        }}
        onClick={handleOpenModalLeft}
      >
        Open Modal Left
      </button>
      <Drawer
        id="drawer"
        title="Title drawer"
        divide
        position="right"
        isOpen={modalOpenRight}
        width={700}
        onClose={handleCloseModalRight}
      >
        <p tabIndex={0}>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Pariatur,
          provident reprehenderit quis sapiente quaerat, totam at officia ipsam
          incidunt blanditiis odio tenetur itaque aspernatur a neque qui
        </p>
      </Drawer>
      <Drawer
        id="drawer"
        title="Title drawer"
        divide
        position="left"
        isOpen={modalOpenLeft}
        width={700}
        onClose={handleCloseModalLeft}
      >
        <p tabIndex={0}>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Pariatur,
          provident reprehenderit quis sapiente quaerat, totam at officia ipsam
          incidunt blanditiis odio tenetur itaque aspernatur a neque qui
        </p>
      </Drawer>
      {/*===================== <Tab> =====================*/}
      <h4>Tab</h4>
      <Tab st={style} value={valueTab}>
        <Tab.List handleClick={handleClick} aria-label="list tab example">
          <Tab.Item
            label="Tab one"
            aria-controls="panel-1"
            aria-labelledby="panel-1"
          />
          <Tab.Item
            label="Tab two"
            aria-controls="panel-2"
            aria-labelledby="panel-2"
          />
          <Tab.Item
            disabled
            label="Tab three"
            aria-controls="panel-3"
            aria-labelledby="panel-3"
          />
          <Tab.Item
            label="Tab four"
            aria-controls="panel-4"
            aria-labelledby="panel-4"
          />
        </Tab.List>
        <Tab.Panel value="Tab one" id="panel-1">
          <ItemOne />
        </Tab.Panel>
        <Tab.Panel value="Tab two" id="panel-2">
          <ItemTwo />
        </Tab.Panel>
        <Tab.Panel value="Tab three" id="panel-3">
          <ItemThree />
        </Tab.Panel>
        <Tab.Panel value="Tab four" id="panel-4">
          <ItemFour />
        </Tab.Panel>
      </Tab>
      {/*===================== <Tooltip> =====================*/}
      <h4>Tooltip</h4>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          width: '400px',
        }}
      >
        <Tooltip
          position="top"
          content="Tooltip top"
          classNames={{
            fontSize: '12px',
          }}
        >
          <p
            style={{
              background: 'gray',
              padding: '5px',
              color: 'white',
              fontSize: '14px',
            }}
          >
            Tooltip top
          </p>
        </Tooltip>
        <Tooltip
          position="right"
          content="Tooltip right"
          classNames={{
            fontSize: '12px',
          }}
        >
          <p
            style={{
              background: 'gray',
              padding: '5px',
              color: 'white',
              fontSize: '14px',
            }}
          >
            Tooltip right
          </p>
        </Tooltip>
        <Tooltip
          position="bottom"
          content="Tooltip bottom"
          classNames={{
            fontSize: '12px',
          }}
        >
          <p
            style={{
              background: 'gray',
              padding: '5px',
              color: 'white',
              fontSize: '14px',
            }}
          >
            Tooltip bottom
          </p>
        </Tooltip>

        <Tooltip
          position="left"
          content="Tooltip left"
          classNames={{
            fontSize: '12px',
          }}
        >
          <p
            style={{
              background: 'gray',
              padding: '5px',
              color: 'white',
              fontSize: '14px',
            }}
          >
            Tooltip left
          </p>
        </Tooltip>
      </div>

      <h4>Button</h4>
      {/*===================== <Button> =====================*/}
      <div style={{ display: 'flex' }}>
        <Button
          classes={{ fontSize: '12px', width: '170px' }}
          text="Button primary"
          variant="primary"
          onClick={(event) => console.log(event)}
        />
        <Button
          classes={{
            fontSize: '12px',
            width: '190px',
            marginLeft: '10px',
            padding: '8px 20px',
          }}
          text="Button secondary"
          variant="secondary"
          onClick={(event) => console.log(event)}
          icon={{
            component: <Icon path={mdiAccount} size={0.8} />,
          }}
        />
        <Button
          classes={{ fontSize: '12px', marginLeft: '10px' }}
          variant="primary"
          singleIcon
          onClick={(event) => console.log(event)}
          icon={{
            component: <Icon path={mdiAccount} size={0.8} />,
          }}
        />
        <Button
          classes={{ fontSize: '12px', marginLeft: '10px' }}
          variant="secondary"
          singleIcon
          onClick={(event) => console.log(event)}
          icon={{
            component: <Icon path={mdiAccount} size={0.8} />,
          }}
        />
      </div>
      <h4>Spinner</h4>
      {/*===================== <Button> =====================*/}
      <div
        style={{ display: 'flex', backgroundColor: '#fff', padding: '20px' }}
      >
        <Spinner variant="primary" size="sm" />
        <Spinner
          styles={{ marginLeft: '15px' }}
          variant="secondary"
          size="md"
        />
      </div>
      {/*===================== <Switch> =====================*/}

      <Switch checked={isChecked} onChange={handleSwitchChange} />
      {/*===================== <ContainerEmpty> =====================*/}
      <h4>Container Empty</h4>
      <ContainerEmpty
        styles={{
          boxShadow: 'initial',
          borderRadius: 'initial',
          marginTop: '20px',
        }}
        title="Titulo"
        description="Descripción"
        border
      />
      <ContainerEmpty
        styles={{
          marginTop: '20px',
        }}
        title="Titulo"
        description="Descripción"
        border
      />
      {/*===================== <Alert> =====================*/}
      <h4>Alerts</h4>
      <div
        style={{
          display: 'flex',
          width: '700px',
          justifyContent: 'space-between',
        }}
      >
        <Alert ref={refAlert} position="bottom-left" variant="error" />
        <Alert ref={refAlert2} position="bottom-right" variant="info" />
        <Alert ref={refAlert3} position="top-center" variant="alert" />
        <Alert ref={refAlert4} position="top-left" variant="success" />
        <button
          style={{
            background: '#ffd4d4',
            border: 'none',
            padding: '12px',
            cursor: 'pointer',
          }}
          onClick={handleAddAlert}
        >
          Alerta Error Bottom-Left
        </button>
        <button
          style={{
            background: '#d4f7ff',
            border: 'none',
            padding: '12px',
            cursor: 'pointer',
          }}
          onClick={handleAddAlert2}
        >
          Alerta Info Bottom-Right
        </button>
        <button
          style={{
            background: '#fffce0',
            border: 'none',
            padding: '12px',
            cursor: 'pointer',
          }}
          onClick={handleAddAlert3}
        >
          Alerta warning Top-Center
        </button>
        <button
          style={{
            background: '#cee6c6',
            border: 'none',
            padding: '12px',
            cursor: 'pointer',
          }}
          onClick={handleAddAlert4}
        >
          Alerta success Top-Left
        </button>
      </div>
    </div>
  );
}

export default App;

const Footer = () => {
  return (
    <div className="footer" tabIndex={0}>
      <p>Total disponible en MB</p>
      <p>2634.47 MB</p>
    </div>
  );
};

const ItemOne = () => {
  return (
    <div className="component">
      <img
        src="https://definicion.de/wp-content/uploads/2009/12/paisaje-1.jpg"
        alt="landscape"
      />
    </div>
  );
};
const ItemTwo = () => {
  return (
    <div className="component">
      <img
        src="https://cdn.pixabay.com/photo/2016/02/10/21/59/landscape-1192669_640.jpg"
        alt="landscape"
      />
    </div>
  );
};
const ItemThree = () => {
  return (
    <div className="component">
      <img
        src="https://i.blogs.es/e32e91/trucos-enfocar-fotografia-paisaje-01/1366_2000.jpg"
        alt="landscape"
      />
    </div>
  );
};

const ItemFour = () => {
  return (
    <div className="component">
      <img
        src="https://www.blogdelfotografo.com/wp-content/uploads/2014/08/61.jpg"
        alt="landscape"
      />
    </div>
  );
};
