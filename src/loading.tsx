const Loading = () => {
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div className="loadingIcon"></div>
      <div style={{ color: "#999", fontSize: "13px" }}>加载中...</div>
    </div>
  );
};

export default Loading;
