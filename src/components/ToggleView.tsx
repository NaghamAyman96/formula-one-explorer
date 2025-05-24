interface ToggleViewProps {
    view: 'list' | 'card';
    setView: (view: 'list' | 'card') => void;
}

const ToggleView = ({ view, setView }: ToggleViewProps) => (
    <div className="flex space-x-2 mb-6">
        <button
            onClick={() => setView('list')}
            className={`px-4 py-2 rounded ${view === 'list' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
        >
            List View
        </button>
        <button
            onClick={() => setView('card')}
            className={`px-4 py-2 rounded ${view === 'card' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
        >
            Card View
        </button>
    </div>
);

export default ToggleView;