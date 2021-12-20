import React, { useEffect, useState } from 'react';
import { Dialog } from '@blueprintjs/core';
import { GetMappingAvatar } from '../utils/rest';

const DetailsModal = props => {
  return (
    <Dialog
      className='pd-5'
      title={props.detailData.name}
      isOpen={props.isDetailsModalOpen}
      onClose={() => props.onCloseDetailsModal()}
    >
      <div className='flex-align-center'>
        <img src={props.detailData.avatar} width={'30%'} height={'30%'} /> <p>Details</p>
        <div className='pd-5'>{props.detailData.about}</div>
      </div>
    </Dialog>
  );
};
export default DetailsModal;
