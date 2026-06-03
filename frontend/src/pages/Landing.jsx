
export default function Landing() {
    return (
        <div>
            Landing
            <button onClick={() => window.location.href = '/login'} className="m-3 bg-purple-300 ">Go to Login</button>
        </div>
    );
}