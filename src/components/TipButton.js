export default function TipButton({ address, amount }) {
    const sendTip = async () => {
        console.log('Sending tip...');
        console.log('To:', address);
        console.log('Amount:', amount);
    };

    return (
        <div>
            <button onClick={sendTip}>Tip {address}</button>
        </div>
    );
}