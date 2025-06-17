import { useState, useEffect } from "react";
import { projects } from "@/data/projects";
import { sites } from "@/data/sites";
import { equipment } from "@/data/equipment";
import { documents } from "@/data/documents";
import { incidents } from "@/data/safety";
import { reports } from "@/data/reports";
import { timesheets } from "@/data/timesheets";

export interface SearchResult {
  id: string | number;
  type: string;
  name: string;
  path: string;
}

export const useSearch = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);

  useEffect(() => {
    const q = query.trim().toLowerCase();
    if (!q) {
      setResults([]);
      return;
    }

    const res: SearchResult[] = [];

    projects.forEach(p => {
      if (p.name.toLowerCase().includes(q) || p.client.toLowerCase().includes(q)) {
        res.push({ id: p.id, type: "Project", name: p.name, path: "/projects" });
      }
    });

    sites.forEach(s => {
      if (s.name.toLowerCase().includes(q) || s.project.toLowerCase().includes(q)) {
        res.push({ id: s.id, type: "Site", name: s.name, path: "/sites" });
      }
    });

    equipment.forEach(e => {
      if (e.name.toLowerCase().includes(q) || e.type.toLowerCase().includes(q)) {
        res.push({ id: e.id, type: "Equipment", name: e.name, path: "/equipment" });
      }
    });

    documents.forEach(d => {
      if (d.name.toLowerCase().includes(q)) {
        res.push({ id: d.id, type: "Document", name: d.name, path: "/documents" });
      }
    });

    incidents.forEach(i => {
      if (i.title.toLowerCase().includes(q)) {
        res.push({ id: i.id, type: "Incident", name: i.title, path: "/safety" });
      }
    });

    reports.forEach(r => {
      if (r.name.toLowerCase().includes(q) || r.description.toLowerCase().includes(q)) {
        res.push({ id: r.id, type: "Report", name: r.name, path: "/reports" });
      }
    });

    timesheets.forEach(t => {
      if (t.worker.toLowerCase().includes(q) || t.task.toLowerCase().includes(q)) {
        res.push({ id: t.id, type: "Timesheet", name: `${t.worker} - ${t.task}`, path: "/timesheets" });
      }
    });

    setResults(res);
  }, [query]);

  return { query, setQuery, results };
};
