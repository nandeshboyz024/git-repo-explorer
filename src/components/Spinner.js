export default function Spinner(){
    return(
         <div
            style={{
                padding: 20,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
            }}
            >
            <svg
                style={{ width: "60px", height: "60px", animation: "spin 1s linear infinite" }}
                viewBox="0 0 50 50"
            >
                <circle
                cx="25"
                cy="25"
                r="20"
                fill="none"
                stroke="#fff"
                strokeWidth="4"
                strokeDasharray="90"
                strokeDashoffset="60"
                />
            </svg>

            <style>
                {`
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
                `}
            </style>
        </div>
    )
}