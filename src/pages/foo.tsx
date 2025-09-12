import "../styles.css";

export default function Foo() {
  return (
    <div>
      <h1>Foo Page</h1>
      <p>Check for cookies in application storage!</p>
    </div>
  );
}

export function getConfig() {
  return {
    render: "static",
  };
}
