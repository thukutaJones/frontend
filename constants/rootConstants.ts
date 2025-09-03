import { LuBriefcaseMedical } from "react-icons/lu";
import { FaRegQuestionCircle } from "react-icons/fa";
import { RiTeamLine } from "react-icons/ri";

export const navContent = [
  {
    title: "Services",
    route: "/#services",
    icon: LuBriefcaseMedical,
    key: "services"
  },
  {
    title: "About Us",
    route: "/#faqs",
    icon: RiTeamLine,
    key: "aboutUs"
  },
  {
    title: "FAQs",
    route: "/#faqs",
    icon: FaRegQuestionCircle,
    key: "faqs"
  },
];
