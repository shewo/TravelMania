export default function InventoryItem({ name }) {
  return (
    <div className="inventory-item">
      <span>{name}</span>

      <div>
        <button>Edit Listing</button>
        <button>View Orders</button>
      </div>
    </div> 
  );
}
