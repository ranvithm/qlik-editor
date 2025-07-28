// Development file for testing the library components
import { useState } from "react"
import { SimpleQlikEditor } from "./index"

const sampleScript = `// Sample Qlik Sense data load script
SET ThousandSep=',';
SET DecimalSep='.';

// Load customer data
LOAD
    CustomerID,
    CustomerName,
    City,
    Country,
    Region
FROM [lib://DataFiles/Customers.xlsx]
(ooxml, embedded labels, table is Sheet1);

// Load sales data with variables
LET vCurrentYear = Year(Today());
LET vLastYear = $(vCurrentYear) - 1;

LOAD
    OrderID,
    CustomerID,
    ProductID,
    OrderDate,
    Quantity,
    UnitPrice,
    Quantity * UnitPrice as TotalAmount,
    Year(OrderDate) as OrderYear
FROM [lib://DataFiles/Orders.csv]
(txt, codepage is 28591, embedded labels, delimiter is ',', msq)
WHERE Year(OrderDate) >= $(vLastYear);`;

const variables = ['vCurrentYear', 'vLastYear', 'vDataPath', 'vQVDPath'];

function DevApp() {
  const [script, setScript] = useState(sampleScript);

  return (
    <div className="h-screen">
      <SimpleQlikEditor 
        initialScript={script}
        variables={variables}
        onScriptChange={setScript}
      />
    </div>
  )
}

export default DevApp;