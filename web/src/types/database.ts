export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      collaborative_trips: {
        Row: {
          id: string
          creator_id: string
          title: string
          description: string | null
          start_date: string | null
          end_date: string | null
          created_at: string
        }
        Insert: {
          id?: string
          creator_id: string
          title: string
          description?: string | null
          start_date?: string | null
          end_date?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          creator_id?: string
          title?: string
          description?: string | null
          start_date?: string | null
          end_date?: string | null
          created_at?: string
        }
      }
      posts: {
        Row: {
          id: string
          author_id: string
          title: string
          content: string | null
          destination: string
          images: string[] | null
          created_at: string
        }
        Insert: {
          id?: string
          author_id: string
          title: string
          content?: string | null
          destination: string
          images?: string[] | null
          created_at?: string
        }
        Update: {
          id?: string
          author_id?: string
          title?: string
          content?: string | null
          destination?: string
          images?: string[] | null
          created_at?: string
        }
      }
      profiles: {
        Row: {
          id: string
          username: string
          full_name: string | null
          avatar_url: string | null
          travel_style: string | null
          created_at: string
        }
        Insert: {
          id: string
          username: string
          full_name?: string | null
          avatar_url?: string | null
          travel_style?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          username?: string
          full_name?: string | null
          avatar_url?: string | null
          travel_style?: string | null
          created_at?: string
        }
      }
      ratings: {
        Row: {
          id: string
          post_id: string
          author_id: string
          score: number
          created_at: string
        }
        Insert: {
          id?: string
          post_id: string
          author_id: string
          score: number
          created_at?: string
        }
        Update: {
          id?: string
          post_id?: string
          author_id?: string
          score?: number
          created_at?: string
        }
      }
      tribes: {
        Row: {
          id: string
          name: string
          description: string | null
          icon: string | null
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          description?: string | null
          icon?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string | null
          icon?: string | null
          created_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
