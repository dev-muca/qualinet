import RateCard from "@/components/RateCard";

export default function Feedback() {
  return (
    <div className="grid lg:grid-cols-2 2xl:grid-cols-4 gap-4 place-items-center">
      <RateCard
        user={{
          name: "A Casa - Materiais p/ Construção",
          type: "supplier",
          cnpj: "10.635.789/0001-48",
          rate: 2,
          totalRated: 43,
          profileImage:
            "https://lh5.googleusercontent.com/p/AF1QipOop6XJ3tTBJ4M20rjNkDTo3NsqsCLUknYHC2cC=w114-h114-n-k-no",
        }}
      />
      <RateCard
        user={{
          name: "LojaElétrica - Artefatos p/ Elétrica e Eletrodomésticos",
          type: "supplier",
          cnpj: "10.475.154/0012-12",
          rate: 4,
          totalRated: 423,
          profileImage:
            "https://scontent-gru1-2.xx.fbcdn.net/v/t39.30808-1/341072375_936353937492252_4016572324371086095_n.jpg?stp=dst-jpg_s160x160&_nc_cat=108&ccb=1-7&_nc_sid=f4b9fd&_nc_eui2=AeEaG3qJqQYDn_64hOet7rwbQBLVaA7EHO1AEtVoDsQc7Yy8E048oT5TgYx4YFULIwQ27gWTpSJd-GdlblzwYL00&_nc_ohc=PPbTmRxJ9yIQ7kNvgEvfjRv&_nc_ht=scontent-gru1-2.xx&_nc_gid=AjX3IdgOWSDXwyMd2rHcieD&oh=00_AYBac8nNZf01I3CYQqa1fLfXr9OpolZq-4QOC6ltotNqew&oe=6704ED43",
        }}
      />
    </div>
  );
}
