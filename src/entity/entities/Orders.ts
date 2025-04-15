import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { Orderitems } from "./Orderitems";
import { Customers } from "./Customers";


@Entity("orders", { schema: "sample" })
export class Orders {
  @Column("int", { primary: true, name: "OrderID" })
  orderId: number | undefined;

  @Column("varchar", { name: "CustomerID", nullable: true, length: 10 })
  customerId: string | undefined;

  @Column("varchar", { name: "Region", nullable: true, length: 50 })
  region: string | undefined;

  @Column("date", { name: "DateOfSale", nullable: true })
  dateOfSale: string | undefined;

  @Column("varchar", { name: "PaymentMethod", nullable: true, length: 50 })
  paymentMethod: string | undefined;

  // @OneToMany(() => Orderitems, (orderitems) => orderitems.order)
  // orderitems: Orderitems[];

  // @ManyToOne(() => Customers, (customers) => customers.orders, {
  //   onDelete: "NO ACTION",
  //   onUpdate: "NO ACTION",
  // })
  // @JoinColumn([{ name: "CustomerID", referencedColumnName: "customerId" }])
  // customer: Customers;
}
