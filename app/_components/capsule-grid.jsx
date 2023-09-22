const CapsuleGrid = ({ capsules }) => {
  return (
    <div className="grid gap-4 grid-cols-6">
      {capsules.map((capsule) => (
        <div key={capsule.id} className="shadow-sm border">
          <h2>{capsule.name}</h2>
          <p>Status: {capsule.status}</p>
          <p>Last Update: {capsule.last_update}</p>
          <p>Type: {capsule.type}</p>
        </div>
      ))}
    </div>
  );
};

export default CapsuleGrid;
