import { useCallback, useEffect, useState } from "react";
import { getAssignmentResultService } from "../services/courseServices";

const POLL_INTERVAL = 30000;

export const useAssignmentResult = (assignmentId) => {
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [error, setError] = useState(null);
    const [hasResult, setHasResult] = useState(false);

    const fetchResult = useCallback(async (isInitial = false) => {
        if (!assignmentId) {
            setError("Assignment ID is missing.");
            setLoading(false);
            return;
        }

        if (isInitial) {
            setLoading(true);
        } else {
            setRefreshing(true);
        }

        try {
            setError(null);

            const response =
                await getAssignmentResultService(assignmentId);

            setResult(response.data ?? null);
            setHasResult(Boolean(response.available));
        } catch (err) {
            setError(
                err.message || "Unable to load assignment result."
            );
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    }, [assignmentId]);

    useEffect(() => {
        let active = true;
        let timer;

        const checkResult = async () => {
            if (!active) return;

            await fetchResult();

            if (active) {
                timer = setTimeout(checkResult, POLL_INTERVAL);
            }
        };

        setLoading(true);
        checkResult();

        return () => {
            active = false;
            clearTimeout(timer);
        };
    }, [fetchResult]);

    const refreshResult = useCallback(() => {
        return fetchResult(false);
    }, [fetchResult]);

    return {
        result,
        loading,
        refreshing,
        error,
        hasResult,
        refreshResult,
    };
};