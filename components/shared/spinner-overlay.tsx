import React from 'react';
import { BeatLoader } from 'react-spinners';

interface SpinnerOverlayProps {
  loading: boolean;
}

const SpinnerOverlay: React.FC<SpinnerOverlayProps> = ({ loading }) => {
  return (
    <>
      {
        loading && (
          <div style={overlayStyle} >
            <BeatLoader color="#000000" loading={loading} size={15} />
          </div>
        )
      }
    </>
  );
};

const overlayStyle: React.CSSProperties = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  background: 'rgba(0, 0, 0, 0.2)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 9999,
};

export default SpinnerOverlay;
