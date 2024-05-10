
import customerIcon from "../../../assets/images/customer.png";
import customerIconActive from "../../../assets/images/customerActive.png";
import constractIcon from "../../../assets/images/constract.png";
import constractIconActive from "../../../assets/images/constractActive.png";
import avatarIcon from "../../../assets/images/avatar.png";
import avatarIconActive from "../../../assets/images/avatarActive.png";
import CustomerManagement from "../../screens/customer-management";
import ConstractManagement from "../../screens/constract-management";
import Profile from "../../screens/profile";

export const publishNavigator = [

]

export const bottomNavigator = [
    {
        component: CustomerManagement,
        name: "CustomerManagement",
        unFocused: customerIcon,
        focused: customerIconActive
    },
    {
        component: ConstractManagement,
        name: "ConstractManagement",
        unFocused: constractIcon,
        focused: constractIconActive
    },
    {
        component: Profile,
        name: "Profile",
        unFocused: avatarIcon,
        focused: avatarIconActive
    },
]
