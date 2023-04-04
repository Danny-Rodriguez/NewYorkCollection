import React from "react";

function DummyCreditCard() {
  return (
    <div className="test-dummy mt-3">
      <p className="dummyText">
        <em>**Use this test-dummy card to complete your mock order!**</em>
      </p>
      <img src="/assets/test-dummy-card.png" alt="test dummy card" width="300" />
    </div>
  );
}

export default DummyCreditCard;
