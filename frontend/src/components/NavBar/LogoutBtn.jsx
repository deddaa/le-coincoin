import UseAuth from "../../hooks/UseAuth";

const logoutBtn = () => {
  const {logout} = UseAuth();
  return (
    <>
      <button onClick={logout} className="text-sm font-medium">
        Se déconnecter
      </button>
      ;
    </>
  );
};

export default logoutBtn;
