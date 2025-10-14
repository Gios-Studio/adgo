import Layout from "../../components/Layout";

export default function HomePage() {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl font-bold mb-6 text-gray-900">
          Welcome to AdGo
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Your advertising campaign management platform
        </p>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-2">Dashboard</h3>
            <p className="text-gray-600">View your campaign metrics and performance</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-2">Ad Upload</h3>
            <p className="text-gray-600">Upload and manage your advertising content</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-2">Analytics</h3>
            <p className="text-gray-600">Deep dive into campaign analytics and insights</p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
