import React from 'react';

export interface FullData {
    project: Project
    cfData: CFData
}

export interface CFData {
    data: CFMod
}

export interface Project {
    cfid: string;
    tag: string;
    name?: string;
    collaborators?: string;
    translation?: string;
    mdid?: string;
    version?: string;
}

interface CFMod {
    id: number
    gameId: number
    name: string
    slug: string
    links: ModLinks
    summary: string
    status: ModStatus
    downloadCount: number
    isFeatured: boolean
    primaryCategoryId: number
    categories: [Category]
    classId: number
    authors: [ModAuthor]
    logo: ModAsset
    screenshots: [ModAsset]
    mainFileId: number
    latestFiles: [File]
    latestFilesIndexes: [FileIndex]
    latestEarlyAccessFilesIndexes: [FileIndex]
    dateCreated: Date
    dateModified: Date
    dateReleased: Date
    allowModDistribution: boolean
    gamePopularityRank: number
    isAvailable: boolean
    thumbsUpCount: number
    rating: number
}

interface ModLinks {
    websiteUrl: string
    wikiUrl: string
    issuesUrl: string
    sourceUrl: string
}

enum ModStatus {
    New = 1,
    ChangesRequired = 2,
    UnderSoftReview = 3,
    Approved = 4,
    Rejected = 5,
    ChangesMade = 6,
    Inactive = 7,
    Abandoned = 8,
    Deleted = 9,
    UnderReview = 10
}

interface Category {
    id: number
    gameId: number
    name: string
    slug: string
    url: string
    iconUrl: string
    dateModified: Date
    isClass: boolean
    classId: number
    parentCategoryId: number
    displayIndex: number
}

interface ModAuthor {
    id: number
    name: string
    url: string
}

interface ModAsset {
    id: number
    modid: number
    title: string
    description: string
    thumbnailUrl: string
    url: string
}

interface File {
    id: number
    gameId: number
    modId: number
    isAvailable: boolean
    displayName: string
    fileName: string
    releaseType: FileReleaseType
    fileStatus: FileStatus
    hashes: [FileHash]
    fileDate: Date
    fileLength: number
    downloadCount: number
    fileSizeOnDisk: number
    downloadUrl: string
    gameVersion: [string]
    sortableGameVersion: [SortableGameVersion]
    dependcies: [FileDependency]
    exposeAsAlternative: boolean
    parentProjectFileId: number
    alternateFileId: number
    isServerPack: boolean
    serverPackFileId: number
    isEarlyAccessContent: boolean
    earlyAccessEndDate: Date
    fileFingerprint: number
    modules: [FileModule]
}

interface FileIndex {
}

enum FileReleaseType {
    Release = 1,
    Beta = 2,
    Alpha = 3
}

enum FileStatus {
    Processing = 1,
    ChangesRequired = 2,
    UnderReview = 3,
    Approved = 4,
    Rejected = 5,
    MalwareDetected = 6,
    Deleted = 7,
    Archived = 8,
    Testing = 9,
    Released = 10,
    ReadyForReview = 11,
    Deprecated = 12,
    Baking = 13,
    AwaitingPublishing = 14,
    FailedPublishing = 15
}

interface FileHash {
    hash: string
    algo: [HashAlgo]
}

enum HashAlgo {
    SHA1 = 1,
    MD5 = 2
}

interface SortableGameVersion {
    gameVersionName: string
    gameVersionPadded: string
    gameVersion: string
    gameVersionReleaseDate: Date
    gameVersionTypeId: number
}

interface FileDependency {
    modId: number
    relationType: FileRelationType
}

enum FileRelationType {
    EmbeddedLibrary = 1,
    OptionalDependency = 2,
    RequiredDependency = 3,
    Tool = 4,
    Incompatible = 5,
    Include = 6
}

interface FileModule {
    name: string
    fingerprint: number
}
