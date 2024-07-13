import { useBasketItems } from "../hooks/useBasket";
const receiptData = {
  storeName: "Sample Store",
  storeAddress: "Merkez Mahallesi 4112 Sokak No:12 0242 423 22 51 Antalya/Serik",
  date: "07.08.2024",
  time: "14.50",
  sellingNumber: 2,
  sellingType: "Nakit",
  cashier: "Ahmet"
}

export default function Receipt({ componentRef }) {
  const basketItems = useBasketItems();
  return(
    <div ref={componentRef}>
      <div id="receipt">
        <div className="receipt-header">{receiptData.storeName}</div>
        <div className="receipt-address">{receiptData.storeAddress}</div>
        <div className="flex-container">
          <div>Tarih : {receiptData.date}</div>
          <div>Saat : {receiptData.time}</div>
        </div>
        <div className="flex-container">
          <div>Satış No : {receiptData.sellingNumber}</div>
          <div>Satış : {receiptData.sellingType}</div>
        </div>
        <div className="flex-container">
          <div>Kasiyer : {receiptData.cashier}</div>
        </div>
        <div className="divider"></div>
        {
          basketItems.map(item => 
            <div className="product">
              <div>84382411 (1 Adet X 15,00)</div>
              <div className="flex-container">
                <div>Örnek Ürün 1</div>
                <div>15,00</div>
              </div>
            </div>
          )
        }
        <div className="divider"></div>
        <div className="flex-container">
          <div>Alınan Para</div>
          <div>100</div>
        </div>
        <div className="flex-container">
          <div>Para Üstü</div>
          <div>9.80</div>
        </div>
        <div className="divider"></div>
        <div className="flex-container">
          <div>Genel Toplam</div>
          <div>90.20</div>
        </div>
      </div>
    </div>
  );
}