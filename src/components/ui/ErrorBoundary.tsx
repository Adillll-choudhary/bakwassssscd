"use client";

import React, { Component, ErrorInfo, ReactNode } from "react";
import { AlertTriangle, RefreshCw } from "lucide-react";

interface Props {
    children: ReactNode;
    fallback?: ReactNode;
    componentName?: string;
}

interface State {
    hasError: boolean;
    error: Error | null;
}

export default class ErrorBoundary extends Component<Props, State> {
    public state: State = {
        hasError: false,
        error: null,
    };

    public static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error };
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error(`Uncaught error in ${this.props.componentName || "Component"}:`, error, errorInfo);
    }

    public render() {
        if (this.state.hasError) {
            if (this.props.fallback) {
                return this.props.fallback;
            }

            return (
                <div className="w-full h-full min-h-[200px] flex flex-col items-center justify-center bg-white/5 border border-white/10 rounded-xl p-6 text-center">
                    <AlertTriangle className="text-accent mb-4" size={32} />
                    <h3 className="text-accent font-serif text-lg mb-2">Component Error</h3>
                    <p className="text-accent text-xs font-mono mb-4 max-w-xs">{this.state.error?.message || "Something went wrong."}</p>
                    <button
                        onClick={() => this.setState({ hasError: false })}
                        className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-full text-xs font-mono text-accent transition-colors"
                    >
                        <RefreshCw size={12} />
                        Try Again
                    </button>
                </div>
            );
        }

        return this.props.children;
    }
}
