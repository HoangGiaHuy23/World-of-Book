import React from "react";
import { WrapperContent } from "./style";
import CategotyBarComponent from "../../components/CategoryBarComponent/CategotyBarComponent";

function TrendPage() {
  return (
    <WrapperContent>
      <div
        style={{
          padding: "10px 20px",
          backgroundColor: "#56B8FF",
          borderTopLeftRadius: "9px",
          borderTopRightRadius: "9px",
          fontSize: "30px",
          color: "red",
          fontWeight: "bold",
        }}
      >
        Trend
      </div>
      <CategotyBarComponent />       
    </WrapperContent>
  );
}

export default TrendPage;
