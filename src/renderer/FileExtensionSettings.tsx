import React from 'react';
import { Button, OverlayTrigger, Tooltip } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import log from 'loglevel';
import FormCheckInput from 'react-bootstrap/FormCheckInput';
import DataTable from 'react-data-table-component';
import { nanoid } from 'nanoid';

const rowData: any = [];

interface DataRow {
  _id: string;
  type: string;
  extension: string;
}

async function formatData() {
  try {
    const result = await window.electron.database.getFileTypes();
    for (let i = 0; i < result.rows.length; i++) {
      const row: DataRow = {
        // eslint-disable-next-line no-underscore-dangle
        _id: result.rows[i].doc._id as string,
        type: result.rows[i].doc.type as string,
        extension: result.rows[i].doc.extension as string,
      };
      rowData.push(row);
    }
  } catch (error) {
    log.error(`ERROR ${error}`);
  }
}

formatData()
  .then()
  .catch((error) => console.log(error));

function fileTypeFormat(val: string) {
  switch (val) {
    case 'FONT':
      return (
        <OverlayTrigger
          placement="bottom"
          overlay={<Tooltip id="button-tooltip-2">Font file</Tooltip>}
        >
          {({ ref, ...triggerHandler }) => (
            <div id={nanoid()} ref={ref} {...triggerHandler}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-file-font"
                viewBox="0 0 16 16"
              >
                <path d="M10.943 4H5.057L5 6h.5c.18-1.096.356-1.192 1.694-1.235l.293-.01v6.09c0 .47-.1.582-.898.655v.5H9.41v-.5c-.803-.073-.903-.184-.903-.654V4.755l.298.01c1.338.043 1.514.14 1.694 1.235h.5l-.057-2z" />
                <path d="M4 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H4zm0 1h8a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1z" />
              </svg>
            </div>
          )}
        </OverlayTrigger>
      );
      break;
    case 'WEB':
      return (
        <OverlayTrigger
          placement="bottom"
          overlay={<Tooltip id="button-tooltip-2">Web file</Tooltip>}
        >
          {({ ref, ...triggerHandler }) => (
            <div id={nanoid()} ref={ref} {...triggerHandler}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-globe"
                viewBox="0 0 16 16"
              >
                <path d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm7.5-6.923c-.67.204-1.335.82-1.887 1.855A7.97 7.97 0 0 0 5.145 4H7.5V1.077zM4.09 4a9.267 9.267 0 0 1 .64-1.539 6.7 6.7 0 0 1 .597-.933A7.025 7.025 0 0 0 2.255 4H4.09zm-.582 3.5c.03-.877.138-1.718.312-2.5H1.674a6.958 6.958 0 0 0-.656 2.5h2.49zM4.847 5a12.5 12.5 0 0 0-.338 2.5H7.5V5H4.847zM8.5 5v2.5h2.99a12.495 12.495 0 0 0-.337-2.5H8.5zM4.51 8.5a12.5 12.5 0 0 0 .337 2.5H7.5V8.5H4.51zm3.99 0V11h2.653c.187-.765.306-1.608.338-2.5H8.5zM5.145 12c.138.386.295.744.468 1.068.552 1.035 1.218 1.65 1.887 1.855V12H5.145zm.182 2.472a6.696 6.696 0 0 1-.597-.933A9.268 9.268 0 0 1 4.09 12H2.255a7.024 7.024 0 0 0 3.072 2.472zM3.82 11a13.652 13.652 0 0 1-.312-2.5h-2.49c.062.89.291 1.733.656 2.5H3.82zm6.853 3.472A7.024 7.024 0 0 0 13.745 12H11.91a9.27 9.27 0 0 1-.64 1.539 6.688 6.688 0 0 1-.597.933zM8.5 12v2.923c.67-.204 1.335-.82 1.887-1.855.173-.324.33-.682.468-1.068H8.5zm3.68-1h2.146c.365-.767.594-1.61.656-2.5h-2.49a13.65 13.65 0 0 1-.312 2.5zm2.802-3.5a6.959 6.959 0 0 0-.656-2.5H12.18c.174.782.282 1.623.312 2.5h2.49zM11.27 2.461c.247.464.462.98.64 1.539h1.835a7.024 7.024 0 0 0-3.072-2.472c.218.284.418.598.597.933zM10.855 4a7.966 7.966 0 0 0-.468-1.068C9.835 1.897 9.17 1.282 8.5 1.077V4h2.355z" />
              </svg>
            </div>
          )}
        </OverlayTrigger>
      );
      break;
    case 'AUDIO':
      return (
        <OverlayTrigger
          placement="bottom"
          overlay={<Tooltip id="button-tooltip-2">Audio file</Tooltip>}
        >
          {({ ref, ...triggerHandler }) => (
            <div id={nanoid()} ref={ref} {...triggerHandler}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-file-music"
                viewBox="0 0 16 16"
              >
                <path d="M10.304 3.13a1 1 0 0 1 1.196.98v1.8l-2.5.5v5.09c0 .495-.301.883-.662 1.123C7.974 12.866 7.499 13 7 13c-.5 0-.974-.134-1.338-.377-.36-.24-.662-.628-.662-1.123s.301-.883.662-1.123C6.026 10.134 6.501 10 7 10c.356 0 .7.068 1 .196V4.41a1 1 0 0 1 .804-.98l1.5-.3z" />
                <path d="M4 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H4zm0 1h8a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1z" />
              </svg>
            </div>
          )}
        </OverlayTrigger>
      );
      break;
    case 'CODE':
      return (
        <OverlayTrigger
          placement="bottom"
          overlay={<Tooltip id="button-tooltip-2">Code file</Tooltip>}
        >
          {({ ref, ...triggerHandler }) => (
            <div id={nanoid()} ref={ref} {...triggerHandler}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-file-code"
                viewBox="0 0 16 16"
              >
                <path d="M6.646 5.646a.5.5 0 1 1 .708.708L5.707 8l1.647 1.646a.5.5 0 0 1-.708.708l-2-2a.5.5 0 0 1 0-.708l2-2zm2.708 0a.5.5 0 1 0-.708.708L10.293 8 8.646 9.646a.5.5 0 0 0 .708.708l2-2a.5.5 0 0 0 0-.708l-2-2z" />
                <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2zm10-1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1z" />
              </svg>
            </div>
          )}
        </OverlayTrigger>
      );
      break;
    case 'SLIDE':
      return (
        <OverlayTrigger
          placement="bottom"
          overlay={<Tooltip id="button-tooltip-2">PPT file</Tooltip>}
        >
          {({ ref, ...triggerHandler }) => (
            <div id={nanoid()} ref={ref} {...triggerHandler}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-file-slides"
                viewBox="0 0 16 16"
              >
                <path d="M5 4a.5.5 0 0 0-.496.438l-.5 4A.5.5 0 0 0 4.5 9h3v2.016c-.863.055-1.5.251-1.5.484 0 .276.895.5 2 .5s2-.224 2-.5c0-.233-.637-.429-1.5-.484V9h3a.5.5 0 0 0 .496-.562l-.5-4A.5.5 0 0 0 11 4H5zm2 3.78V5.22c0-.096.106-.156.19-.106l2.13 1.279a.125.125 0 0 1 0 .214l-2.13 1.28A.125.125 0 0 1 7 7.778z" />
                <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2zm10-1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1z" />
              </svg>
            </div>
          )}
        </OverlayTrigger>
      );
      break;
    case 'SHEET':
      return (
        <OverlayTrigger
          placement="bottom"
          overlay={<Tooltip id="button-tooltip-2">Sheet file</Tooltip>}
        >
          {({ ref, ...triggerHandler }) => (
            <div id={nanoid()} ref={ref} {...triggerHandler}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-file-spreadsheet"
                viewBox="0 0 16 16"
              >
                <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2zm2-1a1 1 0 0 0-1 1v4h10V2a1 1 0 0 0-1-1H4zm9 6h-3v2h3V7zm0 3h-3v2h3v-2zm0 3h-3v2h2a1 1 0 0 0 1-1v-1zm-4 2v-2H6v2h3zm-4 0v-2H3v1a1 1 0 0 0 1 1h1zm-2-3h2v-2H3v2zm0-3h2V7H3v2zm3-2v2h3V7H6zm3 3H6v2h3v-2z" />
              </svg>
            </div>
          )}
        </OverlayTrigger>
      );
      break;
    case 'VIDEO':
      return (
        <OverlayTrigger
          placement="bottom"
          overlay={<Tooltip id="button-tooltip-2">Video file</Tooltip>}
        >
          {({ ref, ...triggerHandler }) => (
            <div id={nanoid()} ref={ref} {...triggerHandler}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-file-play"
                viewBox="0 0 16 16"
              >
                <path d="M6 10.117V5.883a.5.5 0 0 1 .757-.429l3.528 2.117a.5.5 0 0 1 0 .858l-3.528 2.117a.5.5 0 0 1-.757-.43z" />
                <path d="M4 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H4zm0 1h8a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1z" />
              </svg>
            </div>
          )}
        </OverlayTrigger>
      );
      break;
    case 'TEXT':
      return (
        <OverlayTrigger
          placement="bottom"
          overlay={<Tooltip id="button-tooltip-2">Text file</Tooltip>}
        >
          {({ ref, ...triggerHandler }) => (
            <div id={nanoid()} ref={ref} {...triggerHandler}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-card-text"
                viewBox="0 0 16 16"
              >
                <path d="M14.5 3a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h13zm-13-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-13z" />
                <path d="M3 5.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zM3 8a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9A.5.5 0 0 1 3 8zm0 2.5a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5z" />
              </svg>
            </div>
          )}
        </OverlayTrigger>
      );
      break;
    case 'EXE':
      return (
        <OverlayTrigger
          placement="bottom"
          overlay={<Tooltip id="button-tooltip-2">EXE file</Tooltip>}
        >
          {({ ref, ...triggerHandler }) => (
            <div id={nanoid()} ref={ref} {...triggerHandler}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-filetype-exe"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M14 4.5V14a2 2 0 0 1-2 2h-1v-1h1a1 1 0 0 0 1-1V4.5h-2A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v9H2V2a2 2 0 0 1 2-2h5.5L14 4.5ZM2.575 15.202H.785v-1.073H2.47v-.606H.785v-1.025h1.79v-.648H0v3.999h2.575v-.647ZM6.31 11.85h-.893l-.823 1.439h-.036l-.832-1.439h-.931l1.227 1.983-1.239 2.016h.861l.853-1.415h.035l.85 1.415h.908l-1.254-1.992L6.31 11.85Zm1.025 3.352h1.79v.647H6.548V11.85h2.576v.648h-1.79v1.025h1.684v.606H7.334v1.073Z"
                />
              </svg>
            </div>
          )}
        </OverlayTrigger>
      );
      break;
    case 'IMAGE':
      return (
        <OverlayTrigger
          placement="bottom"
          overlay={<Tooltip id="button-tooltip-2">Image file</Tooltip>}
        >
          {({ ref, ...triggerHandler }) => (
            <div id={nanoid()} ref={ref} {...triggerHandler}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-file-image"
                viewBox="0 0 16 16"
              >
                <path d="M8.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
                <path d="M12 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zM3 2a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v8l-2.083-2.083a.5.5 0 0 0-.76.063L8 11 5.835 9.7a.5.5 0 0 0-.611.076L3 12V2z" />
              </svg>
            </div>
          )}
        </OverlayTrigger>
      );
      break;
    case 'ARCHIV':
      return (
        <OverlayTrigger
          placement="bottom"
          overlay={<Tooltip id="button-tooltip-2">Archive file</Tooltip>}
        >
          {({ ref, ...triggerHandler }) => (
            <div id={nanoid()} ref={ref} {...triggerHandler}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-file-earmark-zip"
                viewBox="0 0 16 16"
              >
                <path d="M5 7.5a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1v.938l.4 1.599a1 1 0 0 1-.416 1.074l-.93.62a1 1 0 0 1-1.11 0l-.929-.62a1 1 0 0 1-.415-1.074L5 8.438V7.5zm2 0H6v.938a1 1 0 0 1-.03.243l-.4 1.598.93.62.929-.62-.4-1.598A1 1 0 0 1 7 8.438V7.5z" />
                <path d="M14 4.5V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h5.5L14 4.5zm-3 0A1.5 1.5 0 0 1 9.5 3V1h-2v1h-1v1h1v1h-1v1h1v1H6V5H5V4h1V3H5V2h1V1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V4.5h-2z" />
              </svg>
            </div>
          )}
        </OverlayTrigger>
      );
    case 'BOOK':
      return (
        <OverlayTrigger
          placement="bottom"
          overlay={<Tooltip id="button-tooltip-2">PPT file</Tooltip>}
        >
          {({ ref, ...triggerHandler }) => (
            <div id={nanoid()} ref={ref} {...triggerHandler}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-book"
                viewBox="0 0 16 16"
              >
                <path d="M1 2.828c.885-.37 2.154-.769 3.388-.893 1.33-.134 2.458.063 3.112.752v9.746c-.935-.53-2.12-.603-3.213-.493-1.18.12-2.37.461-3.287.811V2.828zm7.5-.141c.654-.689 1.782-.886 3.112-.752 1.234.124 2.503.523 3.388.893v9.923c-.918-.35-2.107-.692-3.287-.81-1.094-.111-2.278-.039-3.213.492V2.687zM8 1.783C7.015.936 5.587.81 4.287.94c-1.514.153-3.042.672-3.994 1.105A.5.5 0 0 0 0 2.5v11a.5.5 0 0 0 .707.455c.882-.4 2.303-.881 3.68-1.02 1.409-.142 2.59.087 3.223.877a.5.5 0 0 0 .78 0c.633-.79 1.814-1.019 3.222-.877 1.378.139 2.8.62 3.681 1.02A.5.5 0 0 0 16 13.5v-11a.5.5 0 0 0-.293-.455c-.952-.433-2.48-.952-3.994-1.105C10.413.809 8.985.936 8 1.783z" />
              </svg>
            </div>
          )}
        </OverlayTrigger>
      );
    default:
      return (
        <OverlayTrigger
          placement="bottom"
          overlay={<Tooltip id="button-tooltip-2">Unknown file</Tooltip>}
        >
          {({ ref, ...triggerHandler }) => (
            <div id={nanoid()} ref={ref} {...triggerHandler}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-layout-wtf"
                viewBox="0 0 16 16"
              >
                <path d="M5 1v8H1V1h4zM1 0a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1V1a1 1 0 0 0-1-1H1zm13 2v5H9V2h5zM9 1a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1h5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H9zM5 13v2H3v-2h2zm-2-1a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1H3zm12-1v2H9v-2h6zm-6-1a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1H9z" />
              </svg>
            </div>
          )}
        </OverlayTrigger>
      );
  }
}

function columns(): any[] {
  let clickHandler: any;
  return [
    {
      name: 'ID',
      // eslint-disable-next-line no-underscore-dangle
      selector: (row: { _id: string }) => row._id,
      sortable: true,
      omit: true,
    },
    {
      name: 'Extension',
      selector: (row: { extension: string }) => row.extension,
      grow: 1,
      sortable: true,
    },
    {
      name: 'Type',
      selector: (row: { type: string }) => row.type,
      cell: (row: { type: string }) => fileTypeFormat(row.type),
      grow: 2,
      sortable: true,
    },
    {
      name: 'Remove',
      cell: () => (
        <FormCheckInput
          onClick={() => clickHandler}
          className="form-check-input"
          type="checkbox"
          value=""
          id="flexCheckDefault"
        />
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
      grow: 3,
    },
  ];
}

export default function fileExtensionGrid() {
   return (
    <div>
      <div className="centered lg">
        <form className="bg-light border rounded border-secondary shadow-lg">
          <div className="container-fluid">
            <div className="form-group mb-3">
              <div className="form-group mb-3">
                <DataTable columns={columns()} data={rowData} pagination />
              </div>
            </div>
            <div className="form-group mb-3" />
            <div className="input-group mb-3" />
          </div>

          <Button variant="btn btn-secondary" type="button">
            Create
          </Button>
        </form>
      </div>
    </div>
  );
}
