import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";
import { Orderitems } from "./Orderitems";

@Entity("products", { schema: "sample" })
export class Products{
  @PrimaryColumn({ type: "varchar", name: "CustomerID", length: 10 })
  productId: string | undefined;

  @Column("varchar", { name: "ProductName", nullable: true, length: 100 })
  productName: string | undefined;

  @Column("varchar", { name: "Category", nullable: true, length: 50 })
  category: string | undefined;

  @Column("decimal", {
    name: "UnitPrice",
    nullable: true,
    precision: 10,
    scale: 2,
  })
  unitPrice: number | undefined;

  // @OneToMany(() => Orderitems, (orderitems) => orderitems.product)
  // orderitems: Orderitems[] | undefined;
}

