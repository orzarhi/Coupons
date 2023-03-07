import { AiOutlineUser } from "react-icons/ai";
import { BiFoodMenu } from "react-icons/bi";
import { BsFileEarmarkPost } from "react-icons/bs";
import { GrUserSettings } from "react-icons/gr";
import { HiOutlineDocumentAdd, HiOutlineFolderAdd } from "react-icons/hi";
import { ImBarcode, ImExit } from "react-icons/im";
import {
	MdFastfood,
	MdOutlineBusiness,
	MdOutlineBusinessCenter,
	MdOutlinePersonAddAlt,
} from "react-icons/md";
import { RiSettings4Line } from "react-icons/ri";
import { TbReportAnalytics, TbReportSearch } from "react-icons/tb";
import { logout } from "~/services/authService";

export const menus = [
	{
		name: "הגדרת מנהלות",
		title: "הגדרת מנהלות",
		link: "/administration-define",
		icon: MdOutlineBusiness,
		margin: true,
	},
	{
		name: "הגדרת חברות",
		title: "הגדרת חברות",
		link: "/companies-define",
		icon: MdOutlineBusinessCenter,
	},
	{
		name: "הגדרת מחלקות",
		title: "הגדרת מחלקות",
		link: "/departments-define",
		icon: TbReportAnalytics,
	},
	{
		name: "הגדרת קופון",
		title: "הגדרת קופון",
		link: "/coupons-define",
		icon: BiFoodMenu,
	},
	{
		name: "הגדרת סוגי קופון",
		title: "הגדרת סוגי קופון",
		link: "/coupons-types-define",
		icon: ImBarcode,
	},
	{
		name: "הגדרת ספק",
		title: "הגדרת ספק",
		link: "/suppliers-define",
		icon: MdFastfood,
	},
	{
		name: "הגדרת עובדים",
		title: "הגדרת עובדים",
		link: "/employees-define",
		icon: MdOutlinePersonAddAlt,
	},

	{
		name: "הגדרת משמרת",
		title: "הגדרת משמרת",
		link: "/shifts-define",
		icon: BsFileEarmarkPost,
	},

	{
		name: "משתמשים",
		title: "משתמשים",
		link: "/registration-define",
		icon: AiOutlineUser,
	},

	{
		name: "סוגי משתמשים",
		title: "סוגי משתמשים",
		link: "/user-types-define",
		icon: GrUserSettings,
	},
	{
		name: "דוחות",
		title: "דוחות",
		// link: "/report-suppliers-define",
		icon: TbReportSearch,
		onClick: "openReport",
	},
];

export const reports = [
	{
		name: "- ספקים",
		title: "דוחות-ספקים",
		link: "/report-suppliers-define",
	},
	{
		name: "- עובדים",
		title: "דוחות-עובדים",
		link: "/report-employees-define",
	},
	{
		name: "- חברות",
		title: "דוחות-חברות",
		link: "/report-companys-define",
	},
	{
		name: "- הנהלת חשבונות",
		title: "הנהלת-חשבונות",
		link: "/report-bookkeeping-define",
	},
	{
		name: "- חילן",
		title: "דוחות-חילן",
		link: "/report-hilan-define",
	},
	{
		name: "- מנהלה",
		title: "דוחות-מנהלה",
		link: "/report-administration-define",
	},
];

export const settings = [
	{
		name: "הנפקת קופון",
		title: "הנפקת קופון",
		link: "/employees",
		icon: HiOutlineDocumentAdd,
		margin: true,
	},
	{
		name: "הגדרות",
		title: "הגדרות",
		link: "/settings-define",
		icon: RiSettings4Line,
	},

	{
		name: "יציאה",
		title: "יציאה",
		link: "/",
		icon: ImExit,
		onClick: logout,
	},
];
