import { Button, Classes, Intent, Popover } from '@blueprintjs/core';
import React from 'react';

export const ActionCellRenderer = props => {
  const data= props.data
  return (
    <>
      <Button intent={Intent.PRIMARY} text='Details' onClick={()=>props.onClickDetailsModal(data)} />
      <Popover
        content={
          <div style={{ padding: 14 }}>
            <div className='mb-10'>Are you sure you want to delete the character?</div>
            <div className='flex-end'>
              <Button
                text='Yes'
                onClick={()=>props.onConfirmDelete(data)}
                intent='danger'
                className={Classes.POPOVER_DISMISS}
              />
              <Button style={{marginLeft:10}} text='Cancel' className={Classes.POPOVER_DISMISS} />
            </div>
          </div>
        }
      >
        <Button
          intent={Intent.PRIMARY}
          title='Delete this character'
          icon='trash'
          className='ml-5'
        />
      </Popover>
    </>
  );
};
