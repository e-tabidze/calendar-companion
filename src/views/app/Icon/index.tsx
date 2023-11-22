import React, { useState, useEffect } from 'react';

type SvgProps = {
    svgPath: string;
    width?: number | string;
    height?: number | string;
    color?: string;
    className?: string;
    onClick?: () => void
};

function Icon({ svgPath, width='auto', height='auto', className = '', color, onClick }: SvgProps) {
    const [svgContent, setSvgContent] = useState(null);

    useEffect(() => {
        // Dynamically import the SVG file as a React component
        import(`public/icons/${svgPath}.svg`)
            .then((module) => {
                // Module.default is the imported SVG component
                setSvgContent(module.default);
            })
            .catch((error) => {
                console.error('Error loading SVG:', error);
            });
    }, [svgPath]);

    if (!svgContent) {
        return null; // SVG is still loading
    }


    // Clone the imported SVG element and apply the fill color
    const modifiedSvg = React.cloneElement(svgContent, {
        fill: color,
        width: width,
        height: height,
        className: className,
        onClick: onClick
    });

    return <>{modifiedSvg}</>;
}

export default Icon;

// ** usage example **

{/* <Typography type='h5' weight='medium' className='sm:text-sm flex lg:text-sd xl:text-2sm group hover:text-blue-500 '>
     <Icon svgPath='lunch_dining' className='fill-black group-hover:fill-blue-500' />
     კვება
</Typography> */}
