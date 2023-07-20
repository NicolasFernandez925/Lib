# sp-front-design-lib

**sp-front-design-lib** es una biblioteca de diseño y estilos frontend altamente modular y reutilizable, creada para facilitar el desarrollo y mejorar la consistencia visual de aplicaciones web. Esta biblioteca contiene una amplia gama de componentes reutilizables, estilos predefinidos y variables configurables que pueden ser fácilmente integrados en cualquier proyecto.

###

### Estructura de carpetas ⚙️

---

```

root
|-- export
|   |-- components
|   |   |-- Button
|   |   |   |-- Button.tsx
|   |   |   |-- Button.css
|   |   |   |-- index.ts
|   |   |-- Select
|   |   |   |-- Select.tsx
|   |   |   |-- Select.css
|   |   |-- index.ts
|   |-- styles
|   |   |-- index.css
|   |--index.ts
|-- test
|   |-- components
|   |   |-- Button
|   |   |   |-- Button.test.js
|   |   |-- Select
|   |   |   |-- Select.test.js
```

###

#### Organización de Componentes

Dentro de la carpeta `export`, encontraremos otra carpeta llamada `components`, que es donde almacenaremos todos los componentes que conforman nuestro diseño. La idea detrás de esta estructura es que cada componente tenga su propio directorio, lo que hace que el código sea más modular y mantenible.

Por ejemplo, si se cre un nuevo componente llamado `Button`, debe seguir estos pasos:

- Crear una nueva carpeta dentro de `export/components` con el nombre `Button`.
  Dentro de la carpeta `Button`, se deben incluir los siguientes archivos:
- `Button.tsx`: Aquí se implementaría la lógica del componente en formato **TSX**.
- `Button.css`: Contendrá los estilos específicos del componente Button.
- `index.ts`: En este archivo, se exportará el componente para que otros módulos puedan importarlo fácilmente.

Dentro de la carpeta `test` encontraremos **TODOS** los test de los componentes/hooks/funciones etc de toda nuestra librería. Se debe `MANTENER LA MISMA ESTRUCTURA DE CARPETAS QUE SE ESTRUCTURÓ EN EXPORT`.

###

#### Estilos Globales

Los estilos globales, como `variables CSS` y `estilos` que se aplican en toda la aplicación, se encuentran en la carpeta `styles`. Aquí, se puede tener un archivo `index.css` que centralice todos los estilos globales utilizados en el proyecto, `variables CSS` etc.

###

### Estilos globales y variables CSS ✅

---

###

```
:root {
  --font-family: 'Open Sans', sans-serif;
  /* Primary Colors */
  --color-primary-white: #ffffff;
  --color-primary-gray-5: #f5f5f5;
  --color-primary-gray-4: #ebebeb;
  --color-primary-gray-3: #d0d0d0;
  --color-primary-gray-2: #6a6a6a;
  --color-primary-gray-1: #222222;
  --color-primary-black: #000000;
  --color-primary-light-blue: #d4f7ff;
  --color-primary-institutional-blue: #0097a9;
  --color-primary-dark-blue: #006274;

  /* Secondary Colors */
  --color-secondary-light-red: #ffd4d4;
  --color-secondary-institutional-red: #da291c;
  --color-secondary-base-red: #b50000;
  --color-secondary-dark-red: #8b0000;

  /* State Colors */
  --color-state-light-green: #cee6c6;
  --color-state-base-green: #0b7329;

  --color-state-light-orange: #fffce0;
  --color-state-base-orange: #fab400;
}

/* Typography Classes */
.title-1 {
  font-family: var(--font-family);
  font-weight: 600;
  font-size: 18px;
  line-height: 120%;
  letter-spacing: 0;
}

.body-1 {
  font-family: var(--font-family);
  font-weight: 600;
  font-size: 16px;
  line-height: 120%;
  letter-spacing: 0;
}

.body-2 {
  font-family: var(--font-family);
  font-weight: 400;
  font-size: 14px;
  line-height: 120%;
  letter-spacing: 0;
}

.body-2-bold {
  font-family: var(--font-family);
  font-weight: 600;
  font-size: 14px;
  line-height: 120%;
  letter-spacing: 0;
}

.body-3 {
  font-family: var(--font-family);
  font-weight: 400;
  font-size: 12px;
  line-height: 120%;
  letter-spacing: 0;
}

.acronyms {
  font-family: var(--font-family);
  font-weight: 700;
  font-size: 24px;
  line-height: 120%;
  letter-spacing: 0;
}
```

###

### Componentes ✅

---

###

### Table

###

| Propiedad               | Tipo                                             | Descripción                                                                                                                                                                                                                                                                                                                                                                                 |
| ----------------------- | ------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `headers`               | `Header<T>[]`                                    | **Requerido** Array de encabezados de la **tabla** de Tipo **Header**. `ATENCIÓN`, el orden en cómo se construye el array va hacer el posicionamiento de las columnas resultantes en la Tabla. Ejemplo, el primer elemento de `Header[]` va a posicionarse en la **primer columna** de la Tabla, etc. El `Label` de cada item del **Header** debe coincidir con la key del array de `Data`. |
| `data`                  | `T[]`                                            | **Requerido** Array de datos para completar la **tabla**. Tipo genérico. Las keys de cada item del `Data` debe coincidir con las keys del array de `Header` de esta forma se sincronizarán de forma correcta. `ATENCIÓN` cada item debe tener un `ID` único para identificar cada uno.                                                                                                      |
| `itemsPerPage?`         | `number / undefined`                             | **Opcional** Número de elementos por página.**Valor predeterminado: 5**.                                                                                                                                                                                                                                                                                                                    |
| `showPagination?`       | `boolean / undefined`                            | **Opcional** Indica si se muestra la paginación (**default false**)                                                                                                                                                                                                                                                                                                                         |
| `alternateRowColor?`    | `boolean / undefined`                            | **Opcional** Indica si se utiliza un color de fila alternando                                                                                                                                                                                                                                                                                                                               |
| `classHeaderGrid?`      | `CSSProperties / undefined`                      | **Opcional** Estilos **Grid CSS** para la fila de la cabezera de la tabla (ajusta las dimensiones de la fila de la cabecera).                                                                                                                                                                                                                                                               |
| `classRowGrid?`         | `CSSProperties / undefined`                      | **Opcional** Estilos **Grid CSS** para las filas de la tabla (ajusta las dimensiones de las filas).                                                                                                                                                                                                                                                                                         |
| `height?`               | `HeightValue / undefined`                        | **Opcional** Altura de la tabla **(px, em, rem, %, vh)**                                                                                                                                                                                                                                                                                                                                    |
| `footer?`               | `ReactElement / undefined`                       | **Opcional** Componente para el pie de la tabla                                                                                                                                                                                                                                                                                                                                             |
| `filters?`              | `Filter<T>[] / undefined`                        | **Opcional** Array de Filter que contiene el nombre de la columna a quien va a ser aplicado el filtro y la función del filtro. El **nombre de la columna** según el tipo `Filter` para que filtro sea aplicado de forma correcta tiene que coindicir el nombre con el de la columna de quien va hacer aplicado.                                                                             |
| `ref?`                  | `React.Ref / undefined`                          | **Opcional** `ref` para tener acceso a funciones proporcionadas dentro de Table. Una de las funciones expuestas es `resetTable`.                                                                                                                                                                                                                                                            |
| `bordered?`             | `boolean / undefined`                            | **Opcional** `borde` para la tabla.                                                                                                                                                                                                                                                                                                                                                         |
| `classCell?`            | `CSSProperties / undefined`                      | **Opcional** estilos para las celdas de la tabla.                                                                                                                                                                                                                                                                                                                                           |
| `isLoading?`            | `Boolean / undefined`                            | **Opcional** para mostrar un componente de cargando. `ATENCIÓN` si `isLoading` está marcada como **true** se debe proporcionar la **prop** `componentLoading`.                                                                                                                                                                                                                              |
| `componentLoading?`     | `ReactElement / undefined`                       | **Opcional** Componente personalizado para mostrar el cargando.                                                                                                                                                                                                                                                                                                                             |
| `triggerData?`          | `Boolean / undefined`                            | **Opcional** Detecta una acción que interactúa con la Tabla. Si es `true` mostrará la infomación de la Tabla, caso contrario muestra el componente que se proporcionó en `componentWithoutData`.                                                                                                                                                                                            |
| `componentWithoutData?` | `ReactElement / undefined`                       | **Opcional** Componente personalizado cuando aún no se realizo ninguna acción para mostrar la información de la Tabla. La **acción** es cuando cambia `triggerData`. Si `TriggerData` está cómo `true` y se proporcionó un componente para un estado vacío se visualizará.                                                                                                                  |
| `hoveredRow?`           | `Boolean / undefined`                            | **Opcional** para agregar un borde a cada fila al hacer hover.                                                                                                                                                                                                                                                                                                                              |
| `headerFixed?`          | `Boolean / undefined`                            | **Opcional** para dejar fijado el header de la tabla al hacer scroll.                                                                                                                                                                                                                                                                                                                       |
| `generateScroll?`       | `Boolean / undefined`                            | **Opcional** para generar scroll en la tabla.                                                                                                                                                                                                                                                                                                                                               |
| `clickeableRow?`        | `(row: T) => void / undefined`                   | **Opcional** función que al clickear sobre una fila se obtiene dicha `Row`.                                                                                                                                                                                                                                                                                                                 |
| `selectableRows?`       | `Boolean / undefined`                            | **Opcional** para seleccionar multiples filas. `Advertencia`, al colocar `selectableRows` como `true`, debe agregarse un campo extra al array de `Header<T>[]` cómo: `{value: "Selectable", label: "Selectable"}`. **Recordar** que el orden en el array de **Header** importa ya que según el ordenamiento que tenga es cómo se construirá los **headers** de la tabla.                    |
| `onSelectedRowsChange?` | `(rows: RowOnSelected<T>) => (void) / undefined` | **Opcional** función que recibe las `rows` que fueron seleccionadas de la tabla. Funciona en conjunto con la prop `selectableRows`.                                                                                                                                                                                                                                                         |

### Props Header

###

| Propiedad          | Tipo                                                       | Descripción                                                                                                                                                                                                                                                                               |
| ------------------ | ---------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `value`            | `string`                                                   | Un **string** que se mostrará en el header de la **Tabla**.                                                                                                                                                                                                                               |
| `label`            | `keyof T`                                                  | **keyof T** tomará todas las keys del tipo T que se pase al tipo **Header<TypeDataTable>** `ADVERTENCIA`: Deben coincidir el valor de **label** con la key de **Data** para que funcione correctamente sino arrojará un `Error de tipado`.                                                |
| `Tooltip?`         | `(valueRow) => (ReactElement) / undefined`                 | **Opcional** recibe el valor del header de la columna y retorna un ReactElement.                                                                                                                                                                                                         
| `renderComponent?` | `(params: Render<T>) => JSX.Element / undefined`           | **Opcional** Una función que recibe parámetros tipo **Render** y retorna un JSX. `ADVERTENCIA` el objeto del header que contiene renderComponent debe tener un **label** y **value** con el valor de `"Action"` para que sepa que el componente que agrega es una acción en la **Tabla**. |
| `valueGetter?`     | `(row: T) => (string / ReactElement / number) / undefined` | **Opcional** Una función que recibe la **fila** actual. Se utiliza por ejemplo cuándo el valor de la celda es calculable.                                                                                                                                                                 |
| `ariaGetter?`      | `(row: T) => (string) / undefined`                         | Opcional función que recibe la `Row`, se puede modificar la accesibilidad modificando el `aria-label` de la celda.                                                                                                                                                                        |

### Interfaces

###

```
interface Header<T> {
    value: string;
    label: keyof T | ActionRow;
    tooltip?: (valueRow: string) => React.ReactNode;
    renderComponent?: (params: Render<T>) => JSX.Element;
    valueGetter?: (row: T) => string | React.ReactNode | number;
    ariaGetter?: (row: T) => string;
}
```

```
export interface Header<T> {
  value: string;
  label: keyof T | ActionRow;
  tooltip?: (valueRow: string) => React.ReactNode;
  renderComponent?: (params: Render<T>) => JSX.Element;
  valueGetter?: (row: T) => string | React.ReactNode | number;
  ariaGetter?: (row: T) => string;
}

export interface Render<T> {
  row: T;
  rows: T[];
  rowIndex: number;
  id: string;
}

export interface TableProps<T> {
  headers: Header<T>[];
  data: T[];
  bordered?: boolean;
  itemsPerPage?: number;
  showPagination?: boolean;
  alternateRowColor?: boolean;
  classHeaderGrid?: CSSProperties;
  classRowGrid?: CSSProperties;
  heigth?: HeightValue;
  footer?: React.ReactElement;
  filters?: Filter<T>[];
  classCell?: CSSProperties;
  selectableRows?: boolean;
  clickeableRow?: (row: T) => void;
  onSelectedRowsChange?: (rows: RowOnSelected<T>) => void;
  isLoading?: boolean;
  triggerData?: boolean;
  generateScroll?: boolean;
  headerFixed?: boolean;
  componentLoading?: React.ReactElement;
  componentWithoutData?: React.ReactElement;
  hoveredRow?: boolean;
}

export interface RowOnSelected<T> {
  selectedRows: T[];
}

export interface PaginationResult<T> {
  currentItems: T[];
  totalPages: number;
  handlePageChange: (pageNumber: number) => void;
  currentPage: number;
  canGoPrevious: boolean;
  canGoNext: boolean;
  setCurrentItemsPerPage: Dispatch<SetStateAction<number>>;
  currentItemsPerPage: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
}
```

```
type HeightValue = ${number}px | ${number}% | ${number}vh | ${number}rem ${number}em` | "auto";
```

```
type Filter<T> = {
  column: keyof T;
  filter: (...args: any[] | any) => any;
};
```

### Código de ejemplo renderComponent, valueGetter, ariaGetter, Selectable, Tooltip

###

```
  const data: TableData[] = [
      {
        NamePropertyDataOne: "value NamePropertyDataOne",
        NamePropertyDataTwo: "value NamePropertyDataTwo",
      },
      {
        NamePropertyDataOne: "value NamePropertyDataOne",
        NamePropertyDataTwo: "value NamePropertyDataTwo",
      },
      ...
 ]

  const headers: Header<TableData>[] = [
    {
      value: "ValueColumnOne",
      label: "NamePropertyDataOne"
    },
    {
      value: "ValueColumnTwo",
      label: "NamePropertyDataTwo",
       valueGetter: (row) => {
        return row.NamePropertyData === "" ? "-" : row.NamePropertyData;
      }
    },
    {
      value: "Action",
      label: "Action",
      renderComponent: (params) => {
        return (
          <Component />
        );
      },
      valueGetter: (row) => {
        return (
          <Badge
            variant="info"
            text="Title badge"
          />
        );
      },
      ariaGetter: (row) => {
        return `Value aria-label custom`;
      },
      tooltip: (value) => {
        return (
          <Tooltip
            position="right"
            content="Tooltip example"
          >
            <p>{value}</p>
          </Tooltip>
        );
      }
    },
     {
      value: "Selectable",
      label: "Selectable"
    }
  ];

  <Table<TableData>
    bordered
    heigth={"400px"}
    headers={headers}
    data={data}
    ....
  />

```

### Código de ejemplo Filters

###

```

  const sortByProperty = <T, K extends keyof T>(
      data: T[],
      property: K
    ) => {
      const sortedData = [...data].sort((a, b) => {
        const valueA = (a[property] as string).toLowerCase();
        const valueB = (b[property] as string).toLowerCase();

        if (valueA < valueB) {
          return -1;
        } else if (valueA > valueB) {
          return 1;
        } else {
          return 0;
        }
      });
      return sortedData;
    };

    const filters: Filter<TableData>[] = [
      {
        column: "NamePropertyDataOne",
        filter: sortByProperty
      },
    ];

    <Table<TableData>
        bordered
        heigth={"400px"}
        headers={headers}
        data={data}
        filters={filters}
        ....
    />

```

Aplicará el filtro `**sortByProperty**` a la columna `**NamePropertyDataOne**`, siempre colocando el mismo nombre que contiene la propiedad `label` del **Header**.

### Código de ejemplo para resetar valores por defecto de la Tabla

###

```
    interface TableRef {
      resetTable: () => void | null;
    }

    const refTable = useRef<TableRef>(null);

    const handleOnFocusResetTable = (event: React.FocusEvent<HTMLInputElement>) =>{
        if (refTable.current && refTable.current.resetTable) {
          refTable.current.resetTable();
        }
       ...
       ...
    };
    <div>
        <input
            onFocus={handleOnFocusResetTable}
            type="text"
            value={""}
      />
        <Table<TableData>
            ref={refTable}
            bordered
            heigth={"400px"}
            headers={headers}
            data={data}
        ....
       />
    </div>

```

### Alert

###

| Propiedad     | Tipo                            | Descripción .                                                                                                                                                                |
| ------------- | ------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `ref`       | `React.Ref`                 | `ref` es **requerido** para tener acceso a la función `addAlert(message:string, description?:string`).                                                                                |
| `position?` | `Position / undefined`      | **Opcional** Position, define la posición de donde aparece la alerta en la pantalla, los valores son: `'top-left'                                                                     | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right'`. * El valor por defecto si no se proporciana `Position`es`"top-right"` |
| `variant?`  | `Variant / undefined`       | **Opcional** Variant, define la variante de la alerta, las variantes son: `'error' / 'info' / 'success' / 'alert'`. \* El valor por defecto si no se proporciona `variant` es `info`. |
| `styles?`   | `CSSProperties / undefined` | **Opcional** styles, define un estilo personalizado al contenedor de la alerta.                                                                                                       |

### Código

```
interface AlertHandle {
  addAlert: (message: string, description?: string) => void;
}

function Component() {
    const refAlert = useRef<AlertHandle>({ addAlert: () => {} });

    return (
       <div>
           <Alert ref={refAlert} position="top-left" variant="success" />
           <button onClick={handleAddAlert} >
                Trigger alert
           </button>
       </div>
    )
}
```

###

### Drawer

###

| Propiedad   | Tipo                        | Descripción                                                                                                                  |
| ----------- | --------------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| `isOpen`    | `Boolean`                   | `isOpen` es **requerido** para mostrar/ocultar el Drawer.                                                                    |
| `width`     | `Number`                    | `width` **requerido**, define el ancho del Drawer.                                                                           |
| `position`  | `left / right`              | `position` **requerido**, define de que lado se desplazará el Drawer.                                                        |
| `onClose`   | `() => void`                | `onClose` **requerido**, recibe una función para cerrar el Drawer.                                                           |
| `title?`    | `String / undefined `       | `title` **opcional**, define el título del drawer.                                                                           |
| `subTitle?` | `String / undefined`        | `subTitle` **opcional**, define el subtitulo del drawer.                                                                     |
| `classes?`  | `CSSProperties / undefined` | `classes` **opcional**, define un estilo personalizado al contenedor del Drawer.                                             |
| `divide?`   | `Boolean / undefined`       | `divide` **opcional**, define si en el header del modal se le agrega una división entre el titulo y el contenido del Drawer. |
| `children`  | `ReactNode`                 | `children` **requerido**, recibe el contenido del Drawer.                                                                    |
| `id`        | `String `                   | `id` **requerido**, define en donde se va a colocar el Drawer en la estructura HTML.                                         |

###

### Código

###

```
function Component() {
    const [modalOpenRight, setModalOpenRight] = useState(false);
    const handleOpenModalRight = () => {
         setModalOpenRight(true);
    };

    return (
       <div>
           <button onClick={handleOpenModalRight}>
             Open Modal Right
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
       </div>
    )
}
```

\*El `id` **drawer** debe estar colocado en el árbol **HTML**:

```
 <body>
        <div id="root"></div>
        <div id="drawer"></div>
      </body>
```

###

### Tab

El componente Tab se utilizó el Patrón de **composición** para construirlo. En el cual está compuesto por `Tab, Tab.List, Tab.Item, Tab.Panel`. Veremos las Props que recibe cada uno de estos.

###

| Propiedad      | Tipo                            | Descripción .                                                                             |
| -------------- | ------------------------------- | ----------------------------------------------------------------------------------------- |
| `st?`          | `CSSProperties / undefined`     | `st` **opcional**, aplica estilos al componente Tab que contiene todos sus SubComponents. |
| `activeColor?` | `string / undefined`            | `activeColor` **opcional**, define el ancho del Drawer.                                   |
| `value`        | `string`                        | `value` **requerido**, define en que tab se encuentra.                                    |
| `children`     | `ReactElement[] / ReactElement` | `children` **requerido**, define el contenido del Tab.                                    |

###

### Tab.List

###

| Propiedad     | Tipo                            | Descripción .                                                                                                                                                                |
| ------------- | ------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `handleClick` | `(value: string) => void`       | `handleClick` **requerido**, aplica el evento `onClick` a cada item de la **Tab.List**. El **value** que recibe la función es el valor actual del **Tab** que se hizo click. |
| `children`    | `ReactElement[] / ReactElement` | `children` **requerido**, define el contenido de **Tab.List**.                                                                                                               |
| `aria-label`  | `string`                        | `aria-label` **requerido**, define el aria-label para la lista.                                                                                                              |

###

### Tab.Item

###

| Propiedad     | Tipo                            | Descripción .                                                                                                                                                                |
| ------------- | ------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `disabled?`        | `Boolean / undefined`    | `disabled` **opcional**, desabilita el item                                                                                                                                                               |
| `onClick?`         | `() => void / undefined` | `onClick` **opcional**, función para ejecutar cuando se da click sobre algun item del Tab.                                                                                                                |
| `label`            | `string`                 | `label` **requerido**, define cuál es el tab que se seleccionó. `ATENCIÓN` cada label de `Tab.Item` debe ser único para detectar cuál es el tab que se debe mostrar.                                      |
| `icon?`            | `ReactElement            | string                                                                                                                                                                                                    | null | undefined` | `icon` **opcional**, define si se agrega un Icono a los tabs. |
| `aria-controls?`   | `string / undefined`     | `aria-controls` **opcional**, sincroniza el tab seleccionado con el contenido de dicho tab. El valor de `aria-controls` debe ser **único** y debe coincidir con el `id` que se proporciona a `Tab.Panel`. |
| `aria-labelledby?` | `string / undefined`     | `aria-labelledby` **opcional**, sincroniza el tab seleccionado con el contenido de dicho tab. El valor de `aria-labelledby` debe ser el mismo que se colocó en el `id` de `Tab.Panel`.                    |

###

### Tab.Panel

###

| Propiedad   | Tipo                                        | Descripción .                                                                                                                                                                                   |
| ----------- | ------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `st?`       | `CSSProperties / undefined`                 | `st` **opcional**, aplica estilos al contenedor del panel.                                                                                                                                      |
| `children?` | `ReactElement[] / ReactElement / undefined` | `children` **opcional**, define el contenido del Panel.                                                                                                                                         |
| `id`        | `String`                                    | `id` **requerido**, define un id **único** para cada Panel. Este id es requerido ya que es controlado por `aria-controls` de **Tab.Item**.                                                      |
| `value`     | `String`                                    | `value` **requerido**, el valor proporcionado en la prop `value` debe coincidir con algun `label` que se colocó en el componente `Tab.Item` de este modo identificará que Panel debe mostrarse. |

### Código

```
function Component(){
    const [valueTab, setValueTab] = useState<string>('Tab one');
    const handleClick = (label: string) => {
        setValueTab(label);
    };

    return(
      <Tab st={{padding:"20px"}} value={valueTab}>
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
        </Tab.List>
        <Tab.Panel value="Tab one" id="panel-1">
          <ItemOne />
        </Tab.Panel>
        <Tab.Panel value="Tab two" id="panel-2">
          <ItemTwo />
        </Tab.Panel>
      </Tab>
    )
}

```

###

### Select

###

| Propiedad               | Tipo                                            | Descripción .                                                                                                                                                                                                                                                                |
| ----------------------- | ----------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `options`               | `SelectOption[]`                                | `options` **requerido**, las options del Select se conforma de un objeto que contiene 2 propiedades, **label** y **value**. El `value` es el valor del option y el `label` es el valor que va hacer visibile el el Select.                                                   |
| `value`                 | `String`                                        | `value` **requerido**, define el actual valor seleccionado.                                                                                                                                                                                                                  |
| `onChange`              | `({ value, name }: onChangeProps) => void`      | onChange **requerido**, cuándo se selecciona un elemento del Select se ejecuta la función proporcionada en la prop `onChange` y dicha función recibe un **objeto** con 2 propiedades, el `valor` seleccionado y el `name` que se proporciono del select para indentificarlo. |
| `onErrorChange`         | `({ error, name }: onErrorChangeProps) => void` | `onErrorChange` **requerido**, función que recibe un objeto que contiene 2 propiedades, el `error` y el ``name`.                                                                                                                                                             |
| `error?`                | `String / undefined`                            | `error` **opcional**, define un mensaje de error personalizado.                                                                                                                                                                                                              |
| `label?`                | `String / undefined`                            | `label` **opcional**, define el Label para el Select.                                                                                                                                                                                                                        |
| `placeHolder?`          | `String / undefined`                            | `placeHolder` **opcional**, define el valor que se visualizará por defecto cuando no se selecciona ningun elemento del Select. Si no se proporciona un `placeHolder` el valor por defecto es **"Seleccione una opción"**                                                     |
| `messageRequiredField?` | `String / undefined`                            | `messageRequiredField` **opcional**, define el valor que se visualizará cuándo no se selecciona ningun elemento del Select.                                                                                                                                                  |
| `styles?`               | `CSSProperties / undefined`                     | `styles` **opcional**, define estilos generales para el Select.                                                                                                                                                                                                              |
| `disabled?`             | `Boolean / undefined`                           | `disabled` **opcional**, desabilita el select.                                                                                                                                                                                                                               |
| `name`                  | `String`                                        | `name` **requerido**, el name que identifica a dicho Select.                                                                                                                                                                                                                 |

###

### Interfaces

```
interface SelectOption {
  value: string;
  label: string;
}

type onChangeProps = {
  value: string;
  name: string;
};

type onErrorChangeProps = {
  error: boolean;
  name: string;
};
```

### Código

```
function Component() {
     const handleSelectChange = useCallback(
        ({ value, name }: { value: string; name: string }) => {
          setSelectedValue((prevState) => ({
            ...prevState,
            [name]: value,
          }));
        },
        []
    );
    const [selectedValue, setSelectedValue] = useState({
        selectValue: '',
        ...
    });

    return (
        <Select
            options={options}
            value={selectedValue.selectValue}
            onChange={handleSelectChange}
            label="Label"
            name="select"
            onErrorChange={(error) =>
              setError((prevState) => ({ ...prevState, [error.name]: error.error }))
            }
            messageRequiredField="Campo requerido*"
        />
    )
}
```

###

### Tooltip

###

| Propiedad     | Tipo                            | Descripción .                                                                                                                                                                |
| ------------- | ------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `position`    | `'left' / 'right' / 'top' / 'bottom'` | `position` **requerido**, posición de donde se mostrará el Tooltip. |
| `content`     | `String`                                                                                                    | `content` **requerido**, contenido que se visualizará en el Tooltip.                                 |
| `children`    | `ReactNode`                                                                                                 | `children` **requerido**, el elemento hijo del tooltip que al momento de hacerle hover se visualize. |
| `classNames?` | `CSSProperties / undefined`                                                                                 | `classNames` **opcional**, define estilos generales al contenedor del tooltip.                       |
###

### Código

```
function Component() {
    return (
        <Tooltip
          position="top"
          content="Descripcion  Tooltip top"
          classNames={{
            fontSize: '12px',
          }}
        >
          <p>
            Tooltip top
          </p>
        </Tooltip>
    )
}
```

###

### Button

###

| Propiedad     | Tipo                      | Descripción .                                                                                                                               |
| ------------- | ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| `variant`     | `'primary' / 'secondary'` | `variant` **requerido**, define la variante del Button.                                                                                     |
| `text?`       | `String / undefined`      | `text` **opcional**, define el Texto del button.                                                                                            |
| `icon?`       | `Icon / undefined`        | `icon` **opcional**, recibe un objeto que contiene 2 propiedades, `style` define estilos para el icono y `component` que tiene dicho ícono. |
| `singleIcon?` | `Boolean / undefined`     | `singleIcon` **opcional**, define si el button solo tendrá el ícono cómo contenido.                                                         |
| `disabled?` | `Boolean / undefined` | `disabled` **opcional**, desabilita el button. |
| `ariaLabel?` | `String / undefined` | `ariaLabel` **opcional**, proporciona el valor para el `aria-label` del button. |
| `classes?` | `CSSProperties / undefined` | `classes` **opcional**, define estilos generales para el button. |

### Interfaces

```
type Icon = {
  style?: CSSProperties;
  component: ReactNode | string;
}
```

### Código

```
function Component() {
    return (
        <div>
            <Button
                classes={{
                width: '190px',
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
        </div>
    )
}
```

###

### CardClaro

###

| Propiedad    | Tipo                                                         | Descripción .                                                       |
| ------------ | ------------------------------------------------------------ | ------------------------------------------------------------------- |
| `icon`       | `ReactElement`                                               | `icon` **requerido**, define un ícono para la card.                 |
| `title`      | `String`                                                     | `text` **requerido**, define el titulo de la card.                  |
| `styles?`    | `CSSProperties / undefined`                                  | `styles` **opcional**, define estilos generales para el contenedor. |
| `onClick?`   | `() => void / undefined`                                     | `onClick` **opcional**, define un evento de click.                  |
| `onkeyDown?` | `(event: KeyboardEvent<HTMLDivElement>) => void / undefined` | `onkeyDown` **opcional**, define un evento del teclado.             |

###

### ContainerEmpty

###

| Propiedad      | Tipo                        | Descripción .                                                        |
| -------------- | --------------------------- | -------------------------------------------------------------------- |
| `icon`         | `ReactElement`              | `icon` **requerido**, define un ícono para el containerEmpty.        |
| `title`        | `String`                    | `text` **requerido**, define el titulo del containerEmpty.           |
| `styles?`      | `CSSProperties / undefined` | `styles` **opcional**, define estilos generales para el contenedor.  |
| `description?` | `String / undefined`        | `description` **opcional**, define la descripción del containerEmpty |
| `border?` | `Boolean / undefined` | `border` **opcional**, define un borde al containerEmpty. |

###

### Badge

###

| Propiedad  | Tipo                            | Descripción .                                               |
| ---------- | ------------------------------- | ----------------------------------------------------------- |
| `variant`  | `'success' / 'danger' / 'info'` | `variant` **requerido**, define la variante para el Badge.  |
| `styles?`  | `CSSProperties / undefined`     | `text` **opcional**, define los estilos para el contenedor. |
| `onClick?` | `String / undefined`            | `onClick` **opcional**, define un evento onClick.           |
| `text?`    | `String`                        | `text` **opcional**, define el texto para el Badge.         |

###

### Switch

###

| Propiedad  | Tipo                         | Descripción .                                                                                         |
| ---------- | ---------------------------- | ----------------------------------------------------------------------------------------------------- |
| `checked`  | `boolean`                    | `checked` **requerido**, define si el elemento esta marcado como `checked`.                           |
| `onChange` | `(checked: boolean) => void` | `onChange` **requerido**, define un envento onChange donde recibe el valor de `checked` del elemento. |
| `styles?`  | `CSSProperties / undefined`  | `styles` **opcional**, define estilos generales para el contenedor.                                   |

###

### Spinner

###

| Propiedad | Tipo                        | Descripción .                                                                                                           |
| --------- | --------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| `variant` | `'primary' / 'secondary'`   | `checked` **requerido**, define la variante del Spinner. Si no se proporciona la variante por **default** es `primary`. |
| `size?`   | `'sm' / 'md' / undefined`   | `size` **opcional**, define el tamaño para el Spinner. Si no se proporciona el tamaño por **default** es el `md`.       |
| `styles?` | `CSSProperties / undefined` | `text` **opcional**, define estilos generales para el contenedor.                                                       |
