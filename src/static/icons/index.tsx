import { type FC } from "react";

import IconHome from "./home.svg"
import Search from "./search.svg"
import IconLibrary from "./library.svg"
import IconAdd from "./add.svg"
import IconArrow from "./arrow.svg"
import IconExpand from "./expand.svg"
import IconArrowRight from "./chevron-r.svg"
import IconArrowLeftt from "./chevron-l.svg"
import IconBell from "./bell.svg"

export const icons = {
    home: IconHome,
    search: Search,
    library: IconLibrary,
    add:IconAdd,
    arrow:IconArrow,
    expand:IconExpand,
    arrowRight: IconArrowRight,
    arrowLeft: IconArrowLeftt,
    iconBell: IconBell,
};

type IconName = {
    iconData: keyof typeof icons;
    alt: string;
};

/**
 * Icon is a component that renders an image with the specified icon name
 * @example
 * <Icon iconData="home" alt="home" />
 * for change color of icon use css filter
 */
export const Icon: FC<IconName> = ({ alt, iconData, ...rest }) => {
    const icon = icons[iconData];

    return (
        <img
            src={icon.src}
            alt={alt}
            width={icon.width}
            height={icon.height}
            data-icon="true"
            {...rest}
        />
    );
};