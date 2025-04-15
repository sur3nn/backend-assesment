import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { Orders } from "./Orders";
import { Products } from "./Products";

@Index("ProductID", ["productId"], {})
@Entity("orderitems", { schema: "sample" })
export class Orderitems {
  @Column("int", { primary: true, name: "OrderID" })
  orderId: number | undefined;

  @Column("varchar", { primary: true, name: "ProductID", length: 10 })
  productId: string | undefined;

  @Column("int", { name: "QuantitySold", nullable: true })
  quantitySold: number | null | undefined;

  @Column("decimal", {
    name: "Discount",
    nullable: true,
    precision: 4,
    scale: 2,
  })
  discount: number | undefined;

  @Column("decimal", {
    name: "ShippingCost",
    nullable: true,
    precision: 10,
    scale: 2,
  })
  shippingCost: number | undefined;

  // @ManyToOne(() => Orders, (orders) => orders.orderitems, {
  //   onDelete: "NO ACTION",
  //   onUpdate: "NO ACTION",
  // })
  // @JoinColumn([{ name: "OrderID", referencedColumnName: "orderId" }])
  // order: Orders | undefined;

  // @ManyToOne(() => Products, (products) => products.orderitems, {
  //   onDelete: "NO ACTION",
  //   onUpdate: "NO ACTION",
  // })
  // @JoinColumn([{ name: "ProductID", referencedColumnName: "productId" }])
  // product: Products | undefined;
}
