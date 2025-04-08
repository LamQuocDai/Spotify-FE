import { Breadcrumbs, ThemeIcon, Image } from "@mantine/core";
import { Link } from "react-router-dom";
import LogoImage from "../../assets/images/logo.png";

const BreadcumbsComponent = ({ items }) => {
  const elements = items.map((item, index) =>
    index !== items.length - 1 ? (
      <Link
        to={item.href}
        key={index}
        className="text-[#4c6ef5] text-[13px] hover:underline"
      >
        {item.href === "/admin" ? (
          <ThemeIcon variant="transparent" size="xs" key={index} title="Dashboard">
            <Image src={LogoImage} alt="Logo" width={20} height={20} />
          </ThemeIcon>
        ) : (
          item.title
        )}
      </Link>
    ) : (
      <span className="text-[13px]" key={index}>
        {item.title}
      </span>
    )
  );

  return <Breadcrumbs>{elements}</Breadcrumbs>;
};

export default BreadcumbsComponent;