export type Role =
  | 'ADMIN'
  | 'STORE_KEEPER'
  | 'PRODUCTION_SUPERVISOR'
  | 'QC_ENGINEER'
  | 'DISPATCH_TEAM';

export type ProductStatus = 'ACTIVE' | 'INACTIVE';

export type OrderStatus =
  | 'DRAFT'
  | 'LOCKED'
  | 'IN_PROGRESS'
  | 'COMPLETED'
  | 'CANCELLED';

export type AssemblyStage =
  | 'MATERIAL_ISSUED'
  | 'ASSEMBLY_STARTED'
  | 'ASSEMBLY_COMPLETED'
  | 'TESTING'
  | 'PACKING'
  | 'FINISHED';

export type TransactionType =
  | 'INWARD'
  | 'RESERVED'
  | 'UNRESERVED'
  | 'ISSUED'
  | 'CONSUMED'
  | 'ADJUSTMENT';

export type QCResult = 'PASS' | 'FAIL';

export type FailureReason =
  | 'NONE'
  | 'DRIVER_FAILURE'
  | 'PCB_FAULT'
  | 'LED_FAULT'
  | 'ASSEMBLY_DEFECT'
  | 'OTHER';

export type DispatchStatus = 'PENDING' | 'DISPATCHED' | 'CANCELLED';

export type NotificationType =
  | 'LOW_STOCK'
  | 'MATERIAL_SHORTAGE'
  | 'PRODUCTION_DELAY'
  | 'QC_FAILURE'
  | 'PENDING_DISPATCH'
  | 'INFO';

export interface User {
  id: string;
  email: string;
  name: string;
  role: Role;
  phone?: string;
  isActive: boolean;
  createdAt: string;
}

export interface Product {
  id: string;
  modelNumber: string;
  productName: string;
  wattage: number;
  description?: string;
  status: ProductStatus;
  imageUrl?: string;
  createdAt: string;
  updatedAt: string;
  boms?: BOM[];
  _count?: {
    productionOrders: number;
    finishedGoods: number;
  };
}

export interface Material {
  id: string;
  materialCode: string;
  materialName: string;
  category: string;
  currentStock: number;
  reservedStock: number;
  availableStock?: number;
  unit: string;
  unitCost: number;
  reorderLevel: number;
  supplier?: string;
  isLowStock?: boolean;
  totalValue?: number;
  createdAt: string;
  updatedAt: string;
}

export interface BOMItem {
  id: string;
  bomId: string;
  materialId: string;
  quantityRequired: number;
  material: Material;
}

export interface BOM {
  id: string;
  productId: string;
  version: string;
  status: string;
  notes?: string;
  product?: Product;
  items: BOMItem[];
  _count?: { items: number };
  createdAt: string;
  updatedAt: string;
}

export interface ProductionOrderMaterial {
  id: string;
  productionOrderId: string;
  materialId: string;
  requiredQuantity: number;
  reservedQuantity: number;
  issuedQuantity: number;
  material: Material;
}

export interface ProductionOrder {
  id: string;
  orderNumber: string;
  productId: string;
  quantity: number;
  productionDate: string;
  status: OrderStatus;
  stage: AssemblyStage;
  stageNotes?: string;
  createdById?: string;
  createdBy?: { id: string; name: string; role: Role };
  product: Product;
  requiredMaterials: ProductionOrderMaterial[];
  qcReports?: QCReport[];
  createdAt: string;
  updatedAt: string;
}

export interface InventoryTransaction {
  id: string;
  materialId: string;
  transactionType: TransactionType;
  quantity: number;
  previousStock: number;
  newStock: number;
  referenceType?: string;
  referenceId?: string;
  notes?: string;
  createdAt: string;
  material: { materialCode: string; materialName: string; unit: string };
  createdBy?: { id: string; name: string; role: Role };
}

export interface QCReport {
  id: string;
  reportNumber: string;
  productionOrderId: string;
  batchNumber: string;
  voltage: number;
  current: number;
  power: number;
  temperature: number;
  burnInTestDuration: string;
  remarks?: string;
  result: QCResult;
  failureReason: FailureReason;
  inspectorName: string;
  images?: string;
  pdfReportUrl?: string;
  createdAt: string;
  productionOrder?: ProductionOrder;
  certificate?: QCCertificate;
}

export interface QCCertificate {
  id: string;
  certificateNumber: string;
  qcReportId: string;
  batchNumber: string;
  productId: string;
  inspectionDate: string;
  inspectorName: string;
  result: QCResult;
  product?: Product;
  qcReport?: QCReport;
  createdAt: string;
}

export interface FinishedGoods {
  id: string;
  batchNumber: string;
  productId: string;
  quantity: number;
  reservedQuantity: number;
  availableQuantity?: number;
  manufacturingDate: string;
  qcStatus: QCResult;
  notes?: string;
  product: Product;
  createdAt: string;
  updatedAt: string;
}

export interface DispatchOrder {
  id: string;
  dispatchOrderNumber: string;
  customerName: string;
  invoiceNumber: string;
  productId: string;
  quantity: number;
  dispatchDate: string;
  status: DispatchStatus;
  dispatchNotePdfUrl?: string;
  product: Product;
  createdBy?: { id: string; name: string; role: Role };
  createdAt: string;
  updatedAt: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  type: NotificationType;
  isRead: boolean;
  targetRole?: Role;
  link?: string;
  createdAt: string;
}

export interface AuditLog {
  id: string;
  userId?: string;
  userName: string;
  action: string;
  module: string;
  details?: string;
  ipAddress?: string;
  createdAt: string;
}
