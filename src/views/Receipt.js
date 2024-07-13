import { useLocalStorage } from "../hooks/useLocalStorage";
import mD from "../libs/makeDiscount";
import pN from "../libs/priceNormalizer";
import "../stylesheets/Receipt.css";

export default function Receipt() {
  const [receiptData] = useLocalStorage("receiptData");
  return(
    !receiptData 
    ? "Receipt data not found." 
    :
    <div id="receipt">
      <div className="receipt-header">{receiptData.storeName}</div>
      <div className="store-address">{receiptData.storeAddress}</div>
      <div className="flex-container">
        <div>Tarih : {receiptData.date}</div>
        <div>Saat : {receiptData.time}</div>
      </div>
      <div className="flex-container">
        <div>Satis No : {receiptData.sellingNumber}</div>
        <div>Satis : {receiptData.sellingType}</div>
      </div>
      <div className="flex-container">
        <div>Kasiyer : {receiptData.cashier}</div>
      </div>
      <div className="receipt-divider"></div>
      {
        receiptData.products.map(item => 
          <div className="product">
            <div>{item.meta.barcode} ({item.measure} Adet X {pN(mD(item.priceWithTaxes, item.discount))})</div>
            <div className="flex-container">
              <div>{item.title}</div>
              <div>{pN(item.totalPrice)}</div>
            </div>
          </div>
        )
      }
      <div className="receipt-divider"></div>
      <div className="flex-container">
        <div>Alinan Para</div>
        <div>{pN(receiptData.amountPaid)}</div>
      </div>
      <div className="flex-container">
        <div>Para Ustu</div>
        <div>{pN(receiptData.changeAmount)}</div>
      </div>
      <div className="receipt-divider"></div>
      <div className="flex-container">
        <div>Genel Toplam</div>
        <div>{pN(receiptData.totalPrice)}</div>
      </div>
    </div>
  );
}