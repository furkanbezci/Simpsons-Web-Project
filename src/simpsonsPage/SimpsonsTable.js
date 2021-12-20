import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { AgGridColumn, AgGridReact } from 'ag-grid-react';

// import { GetMapping } from './utils/rest';
import { Button, Intent } from '@blueprintjs/core';
import { ActionCellRenderer } from './cellRenderers/ActionCellRenderer';
import AddNewCharacterModal from './AddNewCharacterModal';
import { LocalStorageTerminal } from '../utils/LocalStoragetTerminal';
import { CustomToaster } from '../utils/Toaster';
import DetailsModal from './DetailsModal';
import { GetMapping } from '../utils/rest';

const SimpsonsTable = () => {
  const [simpsonsData, setSimpsonsData] = useState([]);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [detailData, setDetailData] = useState([]);

  useEffect(() => {
    if (!window.localStorage.getItem('simpsonsData')) {
      console.log('geldi mi');
      GetMapping('simpsons').then(res => {
        if (res?.data) {
          setSimpsonsData(res.data);
          LocalStorageTerminal.setItem('simpsonsData', res.data);
        }
      });
    } else {
      LocalStorageTerminal.getItem('simpsonsData').then(res => {
        setSimpsonsData(res);
      });
    }
  }, []);

  const successCallback = () => {
    LocalStorageTerminal.getItem('simpsonsData').then(data => setSimpsonsData(data));
    // setIsModal(false);
  };

  // Modals
  const onClickAddModal = () => {
    setIsOpenModal(true);
  };
  const onCloseAddModal = () => {
    setIsOpenModal(false);
  };
  const onClickDetailsModal = data => {
    setIsDetailsModalOpen(true);
    console.log(data);
    setDetailData(data);
  };
  const onCloseDetailsModal = () => {
    setIsDetailsModalOpen(false);
  };

  // delete
  const onConfirmDelete = charData => {
    const id = charData.id;
    LocalStorageTerminal.getItem('simpsonsData').then(data => {
      const filtered = data.filter(d => d.id !== id);
      console.log(filtered);
      LocalStorageTerminal.setItem('simpsonsData', filtered)
        .then(() => {
          CustomToaster('success', 'Success, character deleted');
          setSimpsonsData(filtered);
        })
        .catch(err => CustomToaster('danger', 'Failed'));
    });
  };

  return (
    <div className='pd-5'>
      <Button
        text='Add New Character'
        intent={Intent.SUCCESS}
        rightIcon={'add'}
        className='mb-10'
        onClick={onClickAddModal}
      />
      {isOpenModal && (
        <AddNewCharacterModal
          isOpenModal={isOpenModal}
          onClickAddModal={onClickAddModal}
          onCloseAddModal={onCloseAddModal}
          successCallback={successCallback}
        />
      )}
      {isDetailsModalOpen && (
        <DetailsModal
          detailData={detailData}
          isDetailsModalOpen={isDetailsModalOpen}
          onCloseDetailsModal={onCloseDetailsModal}
        />
      )}
      <div className='ag-theme-alpine' style={{ height: 600, boxSizing: 'border-box' }}>
        <AgGridReact
          // style={{ height: 500 }}
          rowData={simpsonsData}
          defaultColDef={{ flex: 1, sortable: true, minWidth: 80, resizable: true }}
          pagination={true}
          paginationPageSize={10}
          frameworkComponents={{ actionCellRenderer: ActionCellRenderer }}
        >
          <AgGridColumn headerName='Simpsons'>
            <AgGridColumn field='name' />
            <AgGridColumn field='job' />
            <AgGridColumn
              field='action'
              cellRenderer='actionCellRenderer'
              cellRendererParams={{
                onConfirmDelete: onConfirmDelete,
                onClickDetailsModal: onClickDetailsModal
              }}
            />
          </AgGridColumn>
        </AgGridReact>
      </div>
    </div>
  );
};
export default SimpsonsTable;
