import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { FilterContext } from "../context/FilterContext";
import { AuthContext } from "../context/AuthContext";

import { getAnalytics } from "../api/analytics.api";
import { trackFeature } from "../api/track.api";

import AgeFilter from "../components/filters/AgeFilter";
import GenderFilter from "../components/filters/GenderFilter";
import DateFilter from "../components/filters/DataFilter";

import FeatureBarChart from "../components/charts/BarChart";
import FeatureLineChart from "../components/charts/LineChart";

const Dashboard = () => {

  const { filters } = useContext(FilterContext);
  const { logout, user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [barData, setBarData] = useState([]);
  const [lineData, setLineData] = useState([]);
  const [selectedFeature, setSelectedFeature] = useState(null);
  const [loading, setLoading] = useState(false);

  // ================= LOAD DATA =================
  const loadAnalytics = async (featureName = null) => {
    try {
      setLoading(true);

      const res = await getAnalytics({
        ...filters,
        featureName
      });

      setBarData(res.data.barChart || []);
      setLineData(res.data.lineChart || []);

    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // dashboard visit tracking
  useEffect(() => {
    trackFeature("dashboard_view");
  }, []);

  useEffect(() => {
    loadAnalytics(selectedFeature);
  }, [filters, selectedFeature]);

  const handleBarClick = (feature) => {
    setSelectedFeature(feature);
    trackFeature("bar_chart_click");
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="bg-light min-vh-100">

      {/* ================= NAVBAR ================= */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm">
        <div className="container-fluid">
          <span className="navbar-brand fw-bold">
            📊 Analytics Dashboard
          </span>

          <div className="d-flex align-items-center text-white">
            <span className="me-3">
              {user?.username}
            </span>

            <button
              className="btn btn-danger btn-sm"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      <div className="container py-4">

        {/* ================= FILTER CARD ================= */}
        <div className="card shadow-sm mb-4">
          <div className="card-body">
            <h5 className="card-title mb-3">
              Filters
            </h5>

            <div className="row g-3">
              <div className="col-md-4">
                <DateFilter />
              </div>

              <div className="col-md-4">
                <AgeFilter />
              </div>

              <div className="col-md-4">
                <GenderFilter />
              </div>
            </div>
          </div>
        </div>

        {/* ================= BAR CHART ================= */}
        <div className="card shadow-sm mb-4">
          <div className="card-body">

            <h5 className="card-title">
              Feature Usage
            </h5>

            {loading ? (
              <div className="text-center py-5">
                <div className="spinner-border text-primary"></div>
              </div>
            ) : (
              <FeatureBarChart
                data={barData}
                onBarClick={handleBarClick}
              />
            )}

          </div>
        </div>

        {/* ================= LINE CHART ================= */}
        {selectedFeature && (
          <div className="card shadow-sm">
            <div className="card-body">
              <h5 className="card-title">
                {selectedFeature} Trend
              </h5>

              <FeatureLineChart data={lineData} />
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default Dashboard;