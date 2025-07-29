import React from 'react';
import { Button } from './button';
import { Card } from './card';
import { Badge } from './badge';
import { cn } from '../../lib/utils';
import { Play, Database, Table, BarChart3 } from 'lucide-react';

interface SampleScript {
  id: string;
  title: string;
  description: string;
  category: 'basic' | 'advanced' | 'transform' | 'analysis';
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  script: string;
  icon: React.ComponentType<{ className?: string }>;
}

const sampleScripts: SampleScript[] = [
  {
    id: 'basic-load',
    title: 'Basic Data Load',
    description: 'Simple table load with field mapping',
    category: 'basic',
    difficulty: 'Beginner',
    icon: Database,
    script: `// Basic Data Load Example
LOAD
    ProductID,
    ProductName,
    Category,
    Price,
    InStock
FROM [lib://DataFiles/Products.xlsx]
(ooxml, embedded labels, table is Sheet1);

// Store the loaded data
STORE Products INTO [lib://QVD/Products.qvd] (qvd);`
  },
  {
    id: 'data-transformation',
    title: 'Data Transformation',
    description: 'Transform and clean data during load',
    category: 'transform',
    difficulty: 'Intermediate',
    icon: Table,
    script: `// Data Transformation Example
LOAD
    OrderID,
    CustomerID,
    Date(OrderDate, 'YYYY-MM-DD') as OrderDate,
    Upper(CustomerName) as CustomerName,
    Round(Amount * ExchangeRate, 2) as AmountUSD,
    If(Status = 'C', 'Completed', 
       If(Status = 'P', 'Pending', 'Unknown')) as OrderStatus
FROM [lib://DataFiles/Orders.csv]
(txt, codepage is 1252, embedded labels, delimiter is ',', msq);

// Create calendar fields
LOAD 
    OrderDate,
    Year(OrderDate) as Year,
    Month(OrderDate) as Month,
    WeekDay(OrderDate) as WeekDay,
    Quarter(OrderDate) as Quarter
RESIDENT Orders;`
  },
  {
    id: 'advanced-join',
    title: 'Advanced Join Operations',
    description: 'Complex joins with multiple tables',
    category: 'advanced',
    difficulty: 'Advanced',
    icon: BarChart3,
    script: `// Advanced Join Example
// Load customer data
Customers:
LOAD
    CustomerID,
    CustomerName,
    Region,
    Country
FROM [lib://DataFiles/Customers.xlsx]
(ooxml, embedded labels);

// Load orders with customer information
LEFT JOIN (Customers)
LOAD
    CustomerID,
    OrderID,
    OrderDate,
    Amount
FROM [lib://DataFiles/Orders.xlsx]
(ooxml, embedded labels);

// Create aggregated sales data
SalesAggregation:
LOAD
    CustomerID,
    CustomerName,
    Region,
    Count(OrderID) as TotalOrders,
    Sum(Amount) as TotalSales,
    Avg(Amount) as AvgOrderValue,
    Max(OrderDate) as LastOrderDate
RESIDENT Customers
GROUP BY CustomerID, CustomerName, Region;

DROP TABLE Customers;`
  }
];

interface SampleScriptsProps {
  onSelectScript: (script: string) => void;
  className?: string;
}

const SampleScripts: React.FC<SampleScriptsProps> = ({ onSelectScript, className }) => {
  const getCategoryColor = (category: SampleScript['category']) => {
    switch (category) {
      case 'basic': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'advanced': return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
      case 'transform': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'analysis': return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  const getDifficultyColor = (difficulty: SampleScript['difficulty']) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200';
      case 'Intermediate': return 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200';
      case 'Advanced': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  return (
    <div className={cn("grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4", className)}>
      {sampleScripts.map((sample) => {
        const Icon = sample.icon;
        return (
          <Card key={sample.id} className="p-4 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-2">
                <div className="flex items-center justify-center w-8 h-8 rounded-md bg-primary/10">
                  <Icon className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium text-sm">{sample.title}</h3>
                </div>
              </div>
            </div>
            
            <p className="text-xs text-muted-foreground mb-3 line-clamp-2">
              {sample.description}
            </p>
            
            <div className="flex items-center justify-between mb-3">
              <div className="flex space-x-2">
                <Badge 
                  variant="outline" 
                  className={cn("text-xs px-2 py-0.5", getCategoryColor(sample.category))}
                >
                  {sample.category}
                </Badge>
                <Badge 
                  variant="outline" 
                  className={cn("text-xs px-2 py-0.5", getDifficultyColor(sample.difficulty))}
                >
                  {sample.difficulty}
                </Badge>
              </div>
            </div>
            
            <Button
              variant="outline"
              size="sm"
              className="w-full"
              onClick={() => onSelectScript(sample.script)}
            >
              <Play className="h-3 w-3 mr-2" />
              Use Script
            </Button>
          </Card>
        );
      })}
    </div>
  );
};

export default SampleScripts;