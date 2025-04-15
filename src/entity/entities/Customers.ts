import { Column, Entity, OneToMany } from "typeorm";
import { Orders } from "./Orders";

@Entity("customers", { schema: "sample" })
export class Customers {
  @Column("varchar", { primary: true, name: "CustomerID", length: 10 })
  customerId: string | undefined;

  @Column("varchar", { name: "Name", nullable: true, length: 100 })
  name: string | undefined;

  @Column("varchar", { name: "Email", nullable: true, length: 100 })
  email: string | undefined;

  @Column("text", { name: "Address", nullable: true })
  address: string | undefined;

  // @OneToMany(() => Orders, (orders) => orders.customer)
  // orders: Orders[]  | undefined;
}
