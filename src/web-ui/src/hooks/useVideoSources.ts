import {VideoMediaEntry, VideoSource} from "~/types";
import useGlobalState from "~/hooks/useGlobalState.ts";
import {getSource, sortBy} from "~/util";
import useApiConfig from "~/hooks/useApiConfig.ts";
import useApiVideoOptimizationInfos from "~/hooks/useApiVideoOptimizationInfos.ts";
import {useMemo} from "react";



export default function useVideoSources(video: VideoMediaEntry): VideoSource[] {
    const apiConfig = useApiConfig();
    const videoOptimizations = useApiVideoOptimizationInfos();
    const [optimization] = useGlobalState("optimization", false);

    return useMemo<VideoSource[]>(() => {
        const videoFps = video.meta.video_streams[0].avg_fps;
        const videoSourceSource: VideoSource = {
            label: "Source",
            source: getSource(video.path),
            mimeType: video.meta.mimetype,
            framerate: videoFps,
            width: video.meta.width,
            height: video.meta.height,
        };

        if (!optimization || !apiConfig.allows_optimization) {
            return [videoSourceSource];
        }

        const maxFps = Array.from(new Set(
            Object.values(videoOptimizations)
                .map(info => info.max_fps)
                .sort((a, b) => b - a)
        ))

        const recommendedMaxFps = maxFps.reduce((old, next) => next > videoFps ? next : old, maxFps[0])

        return Object.entries(videoOptimizations)
            .filter(([_label, info]) => info.max_fps <= recommendedMaxFps)
            .filter(([_label, info]) => info.height <= Math.min(video.meta.width, video.meta.height))
            .map<VideoSource>(([label, info]) => ({
                label: label,
                mimeType: "video/mpeg",
                // mimeType: video.meta.mimetype,
                source: getSource(video.path) + `?optimize=true&resolution=${encodeURIComponent(label)}`,
                width: Math.floor(Math.max(video.meta.width, video.meta.height) * (info.height / Math.min(video.meta.width, video.meta.height))),
                height: info.height,
                framerate: Math.min(info.max_fps, videoFps),
            }))
            .concat(videoSourceSource)
            .sort(sortBy("height"));
    }, [apiConfig, videoOptimizations, optimization]);
}
