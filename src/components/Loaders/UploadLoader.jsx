import "./UploadLoader.css";

function UploadLoader() {
  return (
    <div className="fixed inset-0 bg-black opacity-75 z-30">
      <div className="absolute left-1/2 top-1/2">
        <div style={{ transform: "translate(-50%,-50%)" }}>
          
            <div className="lds-roller">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          
        </div>
      </div>
    </div>
  );
}

export default UploadLoader;
