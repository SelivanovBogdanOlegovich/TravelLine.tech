export default function Layout({ children }: any) {
  return (
    <div style={styles.wrapper}>
      <div style={styles.container}>
        {children}
      </div>
    </div>
  );
}

const styles: any = {
  wrapper: {
    background: "#0b0d12",
    color: "white",
    minHeight: "100vh",
    fontFamily: "Arial, sans-serif"
  },

  container: {
    maxWidth: "1200px",
    margin: "0 auto"
  }
};