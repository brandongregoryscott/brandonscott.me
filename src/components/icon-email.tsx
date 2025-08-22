interface IconEmailProps {
    fill?: string;
    size?: number;
}

const IconEmail = (props: IconEmailProps) => {
    const { fill, size = 16 } = props;

    return (
        <svg
            fill={fill}
            version="1.1"
            id="Capa_1"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            width={size}
            height={size}
            viewBox="0 0 94.25 94.25"
            xml:space="preserve">
            <g>
                <path
                    d="M0,15.992v62.266h94.25V15.992H0z M66.025,22.299h20.029v12.682H66.025V22.299z M51.355,64.115H8.195v-5.725h43.161V64.115
		z M51.355,50.027H8.195v-5.724h43.161V50.027z"
                />
            </g>
        </svg>
    );
};

export { IconEmail };
